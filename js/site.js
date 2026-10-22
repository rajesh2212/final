/* Tandooriwala, Bhadrak — page behaviour:
 *  1. mobile nav toggle
 *  2. menu rendering + category filter + search, driven by js/menu-data.js
 * Everything degrades to plain HTML/CSS if JS is unavailable. */
(function () {
  "use strict";

  /* ------------------------------ Nav ------------------------------ */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------ Menu ------------------------------ */

  var list = document.getElementById("menu-list");
  var controls = document.querySelector(".menu-controls");
  var filters = document.getElementById("menu-filters");
  var searchInput = document.getElementById("menu-search-input");
  var note = document.getElementById("menu-note");
  if (!list || typeof MENU === "undefined") return;

  var state = { category: "all", query: "" };

  function hasItems() {
    return MENU.categories.some(function (c) { return c.items.length > 0; });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function priceLabel(p) {
    return typeof p === "number" ? "₹" + p : "—";
  }

  function itemHtml(item) {
    var markers = "";
    if (item.veg === true) {
      markers += '<span class="veg-mark" title="Vegetarian" aria-label="Vegetarian"></span>';
    }
    if (item.spicy) {
      markers += '<span class="spice-tag">' + esc(item.spicy) + "</span>";
    }
    return (
      '<li class="menu-item">' +
      '<div class="menu-item-body">' +
      '<span class="menu-item-name">' + esc(item.name) + markers + "</span>" +
      (item.desc ? '<p class="menu-item-desc">' + esc(item.desc) + "</p>" : "") +
      "</div>" +
      '<span class="menu-item-price">' + priceLabel(item.price) + "</span>" +
      "</li>"
    );
  }

  function matches(item, category) {
    if (category !== "all" && item._cat !== category) return false;
    if (!state.query) return true;
    var hay = (item.name + " " + (item.desc || "")).toLowerCase();
    return hay.indexOf(state.query) !== -1;
  }

  function render() {
    var html = "";
    MENU.categories.forEach(function (cat) {
      var items = cat.items.filter(function (it) {
        it._cat = cat.id;
        return matches(it, state.category);
      });
      if (items.length === 0) return;
      html +=
        '<div class="menu-group">' +
        '<h3 class="menu-group-title">' + esc(cat.name) + "</h3>" +
        '<ul class="menu-items">' +
        items.map(itemHtml).join("") +
        "</ul></div>";
    });
    list.innerHTML =
      html ||
      '<p class="menu-empty">No dishes match — try another category or search term.</p>';
  }

  function buildFilters() {
    if (!filters) return;
    var cats = [{ id: "all", name: "All" }].concat(MENU.categories);
    filters.innerHTML = "";
    cats.forEach(function (cat) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip-btn";
      b.textContent = cat.name;
      b.setAttribute("aria-pressed", cat.id === state.category ? "true" : "false");
      b.addEventListener("click", function () {
        state.category = cat.id;
        filters.querySelectorAll(".chip-btn").forEach(function (btn) {
          btn.setAttribute("aria-pressed", "false");
        });
        b.setAttribute("aria-pressed", "true");
        render();
      });
      filters.appendChild(b);
    });
  }

  if (hasItems()) {
    // Real items exist: activate the full menu UI and hide the placeholder note.
    if (controls) controls.hidden = false;
    if (note) {
      note.textContent = MENU.emptyNote && MENU.emptyNote.indexOf("being updated") !== -1
        ? "Menu and prices can change — call to confirm before ordering."
        : MENU.emptyNote;
    }
    buildFilters();
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value.trim().toLowerCase();
        render();
      });
    }
    render();
  } else {
    // No confirmed items yet: keep the friendly call-to-confirm notice.
    if (note) note.hidden = false;
    list.innerHTML = "";
  }
})();
