// 🎭 Core Mock Database Array Feed (Each grid tagged with its custom Category line)
let initialGrids = [
    { id: 1, title: "Cinematic Neo-Noir Street Realism", imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600", isVideo: false, saved: false, category: "Cinema" },
    { id: 2, title: "Minimalist Architectural Shadow Lines", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600", isVideo: false, saved: false, category: "Architecture" },
    { id: 3, title: "Moody Cyberpunk Tokyo Core Portrait", imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600", isVideo: false, saved: true, category: "Cinema" },
    { id: 4, title: "Ethereal Abstract Geometric Textures", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600", isVideo: false, saved: false, category: "Architecture" },
    { id: 5, title: "Warm Editorial Fine-Art Sketch Profile", imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600", isVideo: false, saved: false, category: "Minimal Art" },
    { id: 6, title: "Futuristic Glassmorphic Geometry Lines", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600", isVideo: false, saved: false, category: "Minimal Art" },
    { id: 7, title: "Vibrant Indie Musical Vinyl Record", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600", isVideo: false, saved: false, category: "Music" }
];

let uploadedMediaStreamUrl = "";
let isVideoAssetType = false;
let currentInspectedGridId = null;

// 🎨 Render Dashboard Pinterest Grid Feed
function displayGrids(gridsArray, targetContainerId = "pinsGridContainer") {
    const gridContainer = document.getElementById(targetContainerId);
    if (!gridContainer) return;
    gridContainer.innerHTML = "";

    if (gridsArray.length === 0) {
        gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px; font-weight:600; width:100%;">No matching grids found!</div>`;
        return;
    }

    gridsArray.forEach(grid => {
        const card = document.createElement("div");
        card.className = "pin-card";
        const isSaved = grid.saved ? "saved" : "";
        const saveButtonText = grid.saved ? "Saved" : "Save";
        const mediaAssetElement = grid.isVideo ? `<video src="${grid.imageUrl}" autoplay loop muted playsinline></video>` : `<img src="${grid.imageUrl}">`;

        card.innerHTML = `
            <div class="media-wrapper" onclick="inspectGridDetail(${grid.id})">
                ${mediaAssetElement}
                <div class="card-overlay-top">
                    <button class="btn-icon" onclick="triggerShareAction(event)"><svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg></button>
                    <button class="btn-save ${isSaved}" onclick="toggleGridSaveState(${grid.id}, event)">${saveButtonText}</button>
                </div>
                <div class="card-overlay-bottom"><span class="author-tag">${grid.category}</span></div>
            </div>
            <div class="pin-title">${grid.title}</div>
        `;
        gridContainer.appendChild(card);
    });
}

// 🎴 Grid Inspector Detail View Connector
window.inspectGridDetail = function(id) {
    const gridItem = initialGrids.find(g => g.id === id);
    if (!gridItem) return;

    currentInspectedGridId = id;
    categoryTabs.style.display = "none";
    dashboardView.style.display = "none";
    profileView.style.display = "none";
    dropdownSearchContainer.style.display = "none"; 
    
    const gridDetailView = document.getElementById("gridDetailView");
    gridDetailView.style.display = "block";

    document.getElementById("detailMediaPane").innerHTML = gridItem.isVideo 
        ? `<video src="${gridItem.imageUrl}" autoplay loop muted controls></video>`
        : `<img src="${gridItem.imageUrl}">`;

    document.getElementById("detailTitleText").innerText = gridItem.title;
    
    const saveBtn = document.getElementById("detailSaveBtn");
    saveBtn.className = gridItem.saved ? "btn-save saved" : "btn-save";
    saveBtn.innerText = gridItem.saved ? "Saved" : "Save";
    
    saveBtn.onclick = (e) => {
        toggleGridSaveState(gridItem.id, e);
        saveBtn.className = gridItem.saved ? "btn-save saved" : "btn-save";
        saveBtn.innerText = gridItem.saved ? "Saved" : "Save";
    };

    const relatedRecommendations = initialGrids.filter(g => g.category.toLowerCase() === gridItem.category.toLowerCase() && g.id !== gridItem.id);
    displayGrids(relatedRecommendations, "recommendationsGridContainer");
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.getElementById("backToHomeBtn").addEventListener("click", () => {
    document.getElementById("gridDetailView").style.display = "none";
    routeToHome();
});

// Save Function Trigger Engine
window.toggleGridSaveState = function(id, event) {
    if (event) event.stopPropagation();
    const gridItem = initialGrids.find(g => g.id === id);
    if (gridItem) {
        gridItem.saved = !gridItem.saved;
        if (document.getElementById("gridDetailView").style.display === "block" && currentInspectedGridId === id) {
            document.getElementById("detailSaveBtn").className = gridItem.saved ? "btn-save saved" : "btn-save";
            document.getElementById("detailSaveBtn").innerText = gridItem.saved ? "Saved" : "Save";
        }
        executeSearch();
    }
};

window.triggerShareAction = function(e) { e.stopPropagation(); alert("Link copied to clipboard area!"); };

// 🎬 Corrected Query Selectors Wiring (Binds seamlessly with top navbar elements)
const createGridModal = document.getElementById("createGridModal");
const authenticationOverlayModal = document.getElementById("authenticationOverlayModal");
const dropZoneContainer = document.getElementById("dropZoneContainer");
const mediaSourceInput = document.getElementById("mediaSourceInput");
const mediaPlaybackPreview = document.getElementById("mediaPlaybackPreview");
const dropzoneTextPrompt = document.querySelector(".dropzone-text-prompt");

const categoryTabs = document.getElementById("categoryTabs");
const dashboardView = document.getElementById("dashboardView");
const profileView = document.getElementById("profileView");
const globalSearchInput = document.getElementById("globalSearchInput");
const dropdownSearchContainer = document.getElementById("dropdownSearchContainer");

const authSignupStatePane = document.getElementById("authSignupStatePane");
const authLoginStatePane = document.getElementById("authLoginStatePane");

// --- 🔍 Top-Bar Integrated Search Toggle Logic ---
const topSearchToggleBtn = document.getElementById("topSearchToggleBtn");
globalSearchInput.addEventListener("input", executeSearch);

topSearchToggleBtn.addEventListener("click", () => {
    if (dropdownSearchContainer.style.display === "none") {
        routeToHome();
        dropdownSearchContainer.style.display = "flex";
        globalSearchInput.focus();
    } else {
        dropdownSearchContainer.style.display = "none";
        globalSearchInput.value = "";
        displayGrids(initialGrids);
    }
});

function executeSearch() {
    const query = globalSearchInput.value.toLowerCase().trim();
    const filteredGrids = initialGrids.filter(grid => grid.title.toLowerCase().includes(query));
    displayGrids(filteredGrids);
}

// --- 🏷️ Category Filter Row Tabs Click Logic ---
document.querySelectorAll(".grid-tab").forEach(tab => {
    tab.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("gridDetailView").style.display = "none";
        profileView.style.display = "none";
        dashboardView.style.display = "block";
        categoryTabs.style.display = "flex";
        
        document.querySelectorAll(".grid-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const selectedCategory = tab.getAttribute("data-category");
        if (!selectedCategory || selectedCategory === "all") {
            displayGrids(initialGrids);
        } else {
            // Case-insensitive check to align categories accurately
            const filteredByCat = initialGrids.filter(g => g.category.toLowerCase() === selectedCategory.toLowerCase());
            displayGrids(filteredByCat);
        }
    });
});

// --- 🧭 Top Navbar Router Actions ---
const topHomeBtn = document.getElementById("topHomeBtn");
const topProfileBtn = document.getElementById("topProfileBtn");
const navBrandHomeClick = document.getElementById("navBrandHomeClick");

function routeToHome() {
    switchActiveTopIconState(topHomeBtn);
    document.getElementById("gridDetailView").style.display = "none";
    profileView.style.display = "none";
    categoryTabs.style.display = "flex";
    dashboardView.style.display = "block";
    dropdownSearchContainer.style.display = "none";
    globalSearchInput.value = "";
    displayGrids(initialGrids);
}

if (topHomeBtn) topHomeBtn.addEventListener("click", routeToHome);
if (navBrandHomeClick) navBrandHomeClick.addEventListener("click", routeToHome);

if (topProfileBtn) {
    topProfileBtn.addEventListener("click", () => {
        switchActiveTopIconState(topProfileBtn);
        document.getElementById("gridDetailView").style.display = "none";
        dropdownSearchContainer.style.display = "none";
        categoryTabs.style.display = "none";
        dashboardView.style.display = "none";
        profileView.style.display = "block";
        renderProfileMosaicGallery();
    });
}

function renderProfileMosaicGallery() {
    const mosaicContainer = document.getElementById("profileMosaicMatrix");
    if (!mosaicContainer) return; mosaicContainer.innerHTML = "";
    initialGrids.slice(0, 6).forEach(grid => {
        const frame = document.createElement("div");
        frame.className = "mosaic-photo-card";
        frame.innerHTML = `<img src="${grid.imageUrl}">`;
        mosaicContainer.appendChild(frame);
    });
}

function switchActiveTopIconState(targetButton) {
    if (!targetButton) return;
    document.querySelectorAll(".top-nav-item").forEach(item => item.classList.remove("active"));
    targetButton.classList.add("active");
}

// --- ➕ Grid File Asset Upload Mechanics ---
document.getElementById("topCreateBtn").addEventListener("click", () => createGridModal.style.display = "flex");
document.getElementById("closeCreateModalBtn").addEventListener("click", purgeCreateModalFields);
dropZoneContainer.addEventListener("click", () => mediaSourceInput.click());

mediaSourceInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    isVideoAssetType = file.type.startsWith("video/");
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedMediaStreamUrl = e.target.result;
        mediaPlaybackPreview.innerHTML = isVideoAssetType ? `<video src="${uploadedMediaStreamUrl}" autoplay loop muted></video>` : `<img src="${uploadedMediaStreamUrl}">`;
        mediaPlaybackPreview.style.display = "block"; dropzoneTextPrompt.style.opacity = "0";
    };
    reader.readAsDataURL(file);
});

document.getElementById("submitGridBtn").addEventListener("click", () => {
    const textTitle = document.getElementById("gridTitleInput").value.trim();
    let textCat = document.getElementById("gridCategoryInput").value.trim() || "Art";
    if (!textTitle || !uploadedMediaStreamUrl) return alert("Complete fields first!");
    
    initialGrids.unshift({ id: initialGrids.length + 1, title: textTitle, imageUrl: uploadedMediaStreamUrl, isVideo: isVideoAssetType, saved: false, category: textCat });
    purgeCreateModalFields();
    routeToHome(); 
});

function purgeCreateModalFields() {
    document.getElementById("gridTitleInput").value = ""; document.getElementById("gridCategoryInput").value = ""; mediaSourceInput.value = ""; uploadedMediaStreamUrl = "";
    mediaPlaybackPreview.innerHTML = ""; mediaPlaybackPreview.style.display = "none"; dropzoneTextPrompt.style.opacity = "1"; createGridModal.style.display = "none";
}

// --- 🔐 Authentication Forms Triggering Mechanics ---
document.getElementById("headerLoginBtn").addEventListener("click", () => activateAuthenticationWindow("login"));
document.getElementById("headerSignupBtn").addEventListener("click", () => activateAuthenticationWindow("signup"));
document.getElementById("dismissSignupCrossBtn").addEventListener("click", () => authenticationOverlayModal.style.display = "none");
document.getElementById("dismissLoginCrossBtn").addEventListener("click", () => authenticationOverlayModal.style.display = "none");
document.getElementById("switchToLoginLinkPointer").addEventListener("click", () => renderInnerAuthCardState("login"));
document.getElementById("switchToSignupLinkPointer").addEventListener("click", () => renderInnerAuthCardState("signup"));

function activateAuthenticationWindow(paneMode) { renderInnerAuthCardState(paneMode); authenticationOverlayModal.style.display = "flex"; }
function renderInnerAuthCardState(paneMode) {
    if (paneMode === "login") { authSignupStatePane.style.display = "none"; authLoginStatePane.style.display = "flex"; } 
    else { authLoginStatePane.style.display = "none"; authSignupStatePane.style.display = "flex"; }
}

document.getElementById("executeLoginSubmitActionBtn").addEventListener("click", () => { alert("Authorized successfully."); authenticationOverlayModal.style.display = "none"; });
document.getElementById("signupEmailContinueActionBtn").addEventListener("click", () => { alert("Account created successfully!"); authenticationOverlayModal.style.display = "none"; });

// --- 📥 Text Content Text-Scraping Event Capture Logic for Inbox Button ---
document.querySelectorAll(".top-nav-item").forEach(item => {
    if (item.textContent.trim().includes("Inbox")) {
        item.addEventListener("click", () => {
            const inboxModal = document.getElementById("inboxMessagingModal");
            if (inboxModal) {
                inboxModal.style.display = "flex";
            }
        });
    }
});

const closeInboxBtn = document.getElementById("dismissInboxModalCrossBtn");
const inboxModalContainer = document.getElementById("inboxMessagingModal");

if (closeInboxBtn && inboxModalContainer) {
    closeInboxBtn.addEventListener("click", () => {
        inboxModalContainer.style.display = "none";
    });
    
    inboxModalContainer.addEventListener("click", (e) => {
        if (e.target === inboxModalContainer) {
            inboxModalContainer.style.display = "none";
        }
    });
}

// Global Boot Initialization
displayGrids(initialGrids);