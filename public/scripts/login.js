document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add Bearer token here
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    // console.log("dataaaa", data);
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      console.log(data.token);

      setTimeout(() => {
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }, 100);
    } else {
      alert(data.message);
      console.log(data);
    }
  });
