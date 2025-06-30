import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import axios from "axios";
import { useEffect, useState, type JSX } from "react";
import Cart from "~/cart/cart";
import { Navbar } from "~/navBar/navbar";
import { Products } from "~/products/products";
import { SideBar } from "~/sideBar/sidebar";


export function Welcome() {
  let [currentCategory, setCurrentCategory] = useState<string>("");
  let [showCart, setShowCart] = useState<boolean>(false);

  const mainContentStyle = {
    display: "flex",
    height: "100%",
  }

  const mainContentContainer = {
    padding: "20px",
    width: "100%",
  }
  const contentHeading = {
    marginBottom: "0",
  }

  const contentParagraph = {
    margin: "5px 0",
  }

  function changeCategory(category: string) {
    console.log(`Changing category to ${category}`);
    setCurrentCategory(category);
  }


  return (
    <main >
      <Navbar setShowCart={setShowCart} />
      <div style={mainContentStyle}>
        <SideBar changeCategory={changeCategory} />
        <div style={mainContentContainer}>
          {!currentCategory && <>
            <h1 style={contentHeading}>Welcome to Local E-commerce</h1>
            <p style={contentParagraph}>Connecting you to your community. Buy and sell with ease.</p>
          </>
          }
          <Products category={currentCategory} />
          {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
        </div>
      </div>

    </main>
  );
}
