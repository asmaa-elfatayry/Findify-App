document.addEventListener("DOMContentLoaded", function () {
  renderNavbarButtons();
  renderButtons();

  const searchInput = document.getElementById("searchInput");
  const itemsContainer = document.getElementById("itemsContainer");

  searchInput.addEventListener("keyup", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const cardContainers = itemsContainer.querySelectorAll(".card-container");

    cardContainers.forEach((cardContainer) => {
      const itemName = cardContainer
        .querySelector(".card-title")
        .textContent.toLowerCase();
      const itemDescription = cardContainer
        .querySelector(".card-text")
        .textContent.toLowerCase();
      const itemLocation = cardContainer
        .querySelector(".loc")
        .textContent.toLowerCase();

      if (
        itemName.includes(searchTerm) ||
        itemDescription.includes(searchTerm) ||
        itemLocation.includes(searchTerm)
      ) {
        cardContainer.style.display = "block";
      } else {
        cardContainer.style.display = "none";
      }
    });
  });

  //end search

  const currentUserId = localStorage.getItem("userId");

  const itemContainers = document.querySelectorAll(".card");

  itemContainers.forEach((card) => {
    const itemUserId = card.parentElement.getAttribute("data-user-id");

    if (itemUserId === currentUserId) {
      // Show the deliver button if i made these posts
      const deliverButton = document.createElement("button");
      deliverButton.textContent = "Item found";
      deliverButton.classList.add("btn", "deliver-btn");
      deliverButton.dataset.itemId =
        card.parentElement.getAttribute("data-item-id");

      deliverButton.addEventListener("click", async function () {
        try {
          const itemId = this.parentElement.parentElement.dataset.itemId;
          // console.log(this.parentElement.parentElement);

          const response = await fetch(`/items/${itemId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            console.log("Item delivered successfully");
            // Slowly remove it
            card.style.transition = "opacity 2s";
            card.style.opacity = 0;
            setTimeout(() => {
              card.remove();
            }, 2000);
          } else {
            console.error("Failed to deliver item");
          }
        } catch (error) {
          console.error("Error delivering item:", error);
        }
      });

      card.querySelector(".card-btns").appendChild(deliverButton);
    } else {
      //show report btn for others user
      const reportButton = document.createElement("button");
      reportButton.textContent = "Report User";
      reportButton.classList.add("btn", "report-user");
      reportButton.dataset.userId = itemUserId;

      reportButton.addEventListener("click", async function (event) {
        const userId = this.dataset.userId;

        try {
          const response = await fetch(`/users/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ report: true }),
          });

          if (response.ok) {
            console.log("User report updated successfully");
            event.target.disabled = true;

            event.target.style.opacity = 0.5;
          } else {
            console.error("Failed to update user report");
          }
        } catch (error) {
          console.error("Error updating user report:", error);
        }
      });

      card.querySelector(".card-btns").appendChild(reportButton);
    }
  });

  document
    .getElementById("addItemForm")
    .addEventListener("submit", handleAddItemForm);
});

async function handleAddItemForm(event) {
  event.preventDefault();
  const formData = new FormData(this);
  try {
    const response = await fetch("/items", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Item added successfully:", data);
      const addItemModal = new bootstrap.Modal(
        document.getElementById("addItemModal")
      );
      addItemModal.hide();

      window.location.reload();
    } else {
      console.log(data);
      console.error("Failed to add item:", data.message);
    }
  } catch (error) {
    console.error("Error adding item:", error);
  }
}

function renderNavbarButtons() {
  const navbarButtons = document.getElementById("navbarButtons");
  const token = localStorage.getItem("token");
  if (token) {
    navbarButtons.innerHTML = `
      <a id="logoutBtn" href="#" onclick="logout()" class="btn btn-outline-light ">Logout</a>
    `;
  } else {
    navbarButtons.innerHTML = `
    <a id="loginLink" href="/login" class="btn btn-outline-light">Login</a>
    <a id="signupLink" href="/signup" class="btn btn-outline-light">Signup</a>
    `;
  }
}

function renderButtons() {
  const userRole = localStorage.getItem("role");
  const adminButtonsContainers = document.querySelectorAll(".adminBtns");
  adminButtonsContainers.forEach((container) => {
    const itemId = container.dataset.itemId;
    const userId = container.dataset.userId;
    if (userRole === "admin") {
      container.innerHTML = `
        <button class="btn btn-warning" onclick="deleteItem('${itemId}')">Delete Item</button>
      `;
    } else {
      container.innerHTML = "";
    }
  });
}

async function logout() {
  try {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    const response = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// for admin
function removeUser(userId) {
  fetch(`/admin/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to remove user");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
