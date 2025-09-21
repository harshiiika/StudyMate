/*****************************************
  chat.js  — front-end only chat demo
  - No server required
  - Multi-tab sync via localStorage 'last_message_<contact>'
  - AI contact handled with small rule-based replies
  - Uses existing HTML DOM (no HTML edits needed)
*****************************************/

(() => {
  // ---------- config ----------
  const AI_ID = "elizabeth-ai";            // internal id for bot
  const CONTACT_SELECTOR = ".chats ul li .pfp-container"; // where your sidebar contact nodes are
  const CONTACT_TITLE_SELECTOR = ".priyanshi h2"; // header h2 on right pane
  const DEFAULT_OPEN = null; // open first found contact if null

  // ---------- state ----------
  const me = getMeName(); // from ?user= query or prompt
  let currentContact = null;

  // DOM refs
  const chatBox = document.getElementById("chat-box");
  const contactsNodes = Array.from(document.querySelectorAll(CONTACT_SELECTOR));
  const chatTitleEl = document.querySelector(CONTACT_TITLE_SELECTOR);

  // if sidebar doesn't contain AI contact, we'll add it to the top visually (no HTML edit)
  ensureAIContact();

  // wire existing sidebar contacts (reads <p> name inside .pfp-container)
  const contacts = buildContactsFromSidebar();

  // pick initial contact
  currentContact = DEFAULT_OPEN || contacts[0]?.id;
  openChat(currentContact);

  // expose sendMessage globally because your HTML calls onclick="sendMessage()"
  window.sendMessage = function () {
    const input = document.getElementById("messageInput");
    const text = (input && input.value || "").trim();
    if (!text) return;

    const msg = makeMsg(me, text);
    saveMessage(currentContact, msg);
    renderMessages(currentContact);
    input.value = "";

    // sync marker for other tabs
    localStorage.setItem(`last_message_${currentContact}`, JSON.stringify({ t: Date.now() }));

    // if current contact is AI, produce an automatic reply (rule-based)
    if (currentContact === AI_ID) {
      // Simulate typing delay
      setTyping(currentContact, "AI");
      setTimeout(() => {
        const replyText = aiReply(text);
        const botMsg = makeMsg(getContactName(AI_ID), replyText);
        saveMessage(currentContact, botMsg);
        renderMessages(currentContact);
        localStorage.setItem(`last_message_${currentContact}`, JSON.stringify({ t: Date.now() }));
        clearTyping(currentContact);
      }, 600 + Math.random() * 800);
    }
  };

  // storage event — other tabs wrote messages => re-render if relevant
  window.addEventListener("storage", (ev) => {
    if (!ev.key) return;
    if (ev.key.startsWith("last_message_")) {
      const chatId = ev.key.replace("last_message_", "");
      // if the changed chat is open, re-render
      if (chatId === currentContact) renderMessages(currentContact);
    }
    if (ev.key.startsWith("typing_")) {
      // optional: can show typing indicator if you implement it
    }
  });

  /* ========== Helper Functions ========== */

  function buildContactsFromSidebar() {
    // returns array of contact objects {id, name, node}
    const arr = [];
    // read all .pfp-container nodes and extract the <p> text
    contactsNodes.forEach((node, idx) => {
      const nameNode = node.querySelector("p");
      const name = nameNode ? nameNode.textContent.trim() : `Contact ${idx+1}`;
      const id = slugify(name);
      // attach click handler
      node.style.cursor = "pointer";
      node.addEventListener("click", () => openChat(id));
      arr.push({ id, name, node });
    });

    // if we added the AI contact earlier, ensure it's first
    const aiIdx = arr.findIndex(c => c.id === AI_ID);
    if (aiIdx >= 0) {
      const aiObj = arr.splice(aiIdx, 1)[0];
      arr.unshift(aiObj);
    }
    return arr;
  }

  function ensureAIContact(){
    // If the sidebar already included a contact named "Elizabeth" or similar, we map to AI_ID.
    // Otherwise we inject a tiny visual AI contact at the top of the .chats list.
    // This does NOT modify your HTML sources permanently; it's just a DOM insertion.
    const ul = document.querySelector(".chats ul");
    if (!ul) return;

    // check if an ai-like contact exists
    const existing = Array.from(ul.querySelectorAll("p")).find(p =>
      /elizabeth|ai|bot|studymate/i.test(p.textContent || "")
    );
    if (existing) {
      // rename that contact's id to AI_ID by adding data attribute on its container
      existing.closest(".pfp-container")?.setAttribute("data-contact-id", AI_ID);
      return;
    }

    // create a small li at top for AI contact
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="pfp-container" data-contact-id="${AI_ID}">
        <div class="pfp"><img src="/images/logo.png" class="pics" alt="AI"></div>
        <p>Elizabeth (AI)</p><br>
        <div class="msg">Study helper bot.</div>
      </div>
    `;
    ul.prepend(li);
    // re-query contactsNodes to include injected node
    // (we don't reassign contactsNodes variable here but buildContactsFromSidebar will pick it up)
  }

  function openChat(contactId) {
    currentContact = contactId;
    const name = getContactName(contactId);
    // update right header
    if (chatTitleEl) chatTitleEl.textContent = name;
    // clear and render
    renderMessages(contactId);
  }

  function getContactName(id) {
    // find matching <p> content or use fallback
    const node = document.querySelector(`[data-contact-id="${id}"]`);
    if (node) {
      const p = node.querySelector("p");
      if (p) return p.textContent.trim();
    }
    // fallback: try to find p whose slug matches
    const pnode = Array.from(document.querySelectorAll(".chats p")).find(p => slugify(p.textContent) === id);
    if (pnode) return pnode.textContent.trim();
    // last fallback
    return id === AI_ID ? "Elizabeth (AI)" : id;
  }

  function makeMsg(sender, text) {
    return { sender, text, t: Date.now() };
  }

  function saveMessage(chatId, msgObj) {
    const key = `chat_${chatId}`;
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push(msgObj);
    localStorage.setItem(key, JSON.stringify(arr));
  }

  function getMessages(chatId) {
    return JSON.parse(localStorage.getItem(`chat_${chatId}`) || "[]");
  }

  function renderMessages(chatId) {
    if (!chatBox) return;
    const msgs = getMessages(chatId);
    chatBox.innerHTML = "";
    msgs.forEach(m => {
      const el = document.createElement("div");
      const who = m.sender === me ? "user-msg" : "other-msg";
      el.className = who;
      // include timestamp (short)
      const time = new Date(m.t).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      el.innerHTML = `<div class="bubble-text">${escapeHtml(m.text)}</div><div class="bubble-meta">${escapeHtml(m.sender)} • ${time}</div>`;
      chatBox.appendChild(el);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function setTyping(chatId, who) {
    localStorage.setItem(`typing_${chatId}`, who);
  }
  function clearTyping(chatId) {
    localStorage.removeItem(`typing_${chatId}`);
  }

  function aiReply(userText) {
    const t = (userText || "").toLowerCase();
    if (t.includes("hi") || t.includes("hello")) return "Hi! I'm Elizabeth — I can help with notes, tasks, or quick summaries.";
    if (t.includes("note")) return "Open the Notes panel and I'll find your recent notes.";
    if (t.includes("task")) return "Break tasks into 3 steps and mark one as done today.";
    if (t.includes("explain")) return "Give me a topic and I'll summarize it in 2-3 lines.";
    if (t.includes("bye") || t.includes("thanks")) return "You're welcome! Ask me anything later.";
    const fallback = ["Nice — tell me more.", "I can help with notes, tasks, and summaries.", "Could you try phrasing it differently?"];
    return fallback[Math.floor(Math.random()*fallback.length)];
  }

  function slugify(text) {
    if (!text) return "";
    return text.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function getMeName() {
    const qp = new URLSearchParams(location.search);
    const q = qp.get("user") || qp.get("me");
    if (q && q.trim()) return q.trim();
    const cached = sessionStorage.getItem("chat_demo_me");
    if (cached) return cached;
    const name = prompt("Enter display name for this demo (e.g. Alice):", "You");
    const final = (name && name.trim()) ? name.trim() : "You";
    sessionStorage.setItem("chat_demo_me", final);
    return final;
  }

})();
