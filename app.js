const taxRated = 0.18;
const shippingPrices = 15;
const shippingFreePrices = 300;
window.addEventListener("load", () => {
  localStorage.setItem("taxRated", taxRated);
  localStorage.setItem("shippingPrices", shippingPrices);
  localStorage.setItem("shippingFreePrices", shippingFreePrices);
  cartPrize();
});
const page = document.querySelector(".img");
page.addEventListener("click", (e) => {
  if (e.target.className == "fa-solid fa-minus") {
    // alert("-clicked");
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
      productTotal(e.target);
    } else {
      if (
        confirm(
          `${
            e.target.closest(".bag").querySelector("p").innerText
          } will be remove`
        )
      ) {
        e.target.closest(".bag").remove();
      }
    }
    cartPrize();
  } else if (e.target.classList.contains("fa-plus")) {
    // alert("+clicked");
    e.target.closest(".bag").querySelector(".calc span").innerText++;
    productTotal(e.target);
    cartPrize();
  } else if (e.target.className == "remove") {
    if (
      confirm(
        `${
          e.target.closest(".bag").querySelector("p").innerText
        } will be remove`
      )
    ) {
      e.target.closest(".bag").remove();
    }
    cartPrize();
    // alert("remove");
  } else {
    alert("other clicked");
  }
});

const productTotal = (target) => {
  const info = target.closest(".bag div");
  console.log(info);
  let productPrice = info.querySelector(".price strong").innerText;
  let quantity = info.querySelector(".calc span").innerText;
  info.querySelector(".fiat strong").innerText = productPrice * quantity;
};
const cartPrize = () => {
  let subTotal = 0;
  document
    .querySelectorAll(".fiat strong")
    .forEach((p) => (subTotal += +p.innerText));
  document.querySelectorAll(".subtotal i ")[0].innerText = subTotal.toFixed(2);
  let taxPrice = document.querySelectorAll(".tax i");
  taxPrice[0].innerText = (subTotal * localStorage.getItem("taxRated")).toFixed(
    2
  );
  let shipping = document.querySelectorAll(".shipping i");
  shipping[0].innerText =
    subTotal > 0 && subTotal < localStorage.getItem("shippingFreePrices")
      ? localStorage.getItem("shippingPrices")
      : 0;
  let total = document.querySelectorAll(".total i");
  total[0].innerText = parseFloat(
    +shipping[0].innerText + +taxPrice[0].innerText + +subTotal
  ).toFixed(2);
};
