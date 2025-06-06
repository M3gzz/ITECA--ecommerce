import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import { Navbar } from "~/navBar/navbar";
import { SideBar } from "~/sideBar/sidebar";


export function Welcome() {

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
  const productContainer = {
    height: "fit-content",
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gap: '20px',
    padding: "10px",
    overflow: 'auto',
    maxWidth: '60rem'
  }
  const productCard = {
    color: "white",
    padding: "10px 30px",
    height: "25rem",
    width: "20rem",
    backgroundColor: "#153B50",
    borderRadius: "10px"
  }
  const featuredProductContainer = {
    margin: "20px 10px",
  }
  const productCardImageContainer = {
    width: "100%",
    height: "60%",
    display: "flex"
  }
  const productCardImage = {
    width: "90%",
    height: "100%",
    margin: "auto"
  }

  function getProducts() {
    let products: any = [];

    [1, 2, 3].forEach((product) => {
      products.push(
        <div style={productCard} key={product}>
          <h2>Product {product}</h2>
          <div style={productCardImageContainer}>
            <img alt="placeholder" style={productCardImage} src="./stockPhoto.jpg" />
          </div>
          <p>Description of product {product}</p>
          <p>Price: $100</p>
        </div>
      )
    })

    return products;
  }

  return (
    <main >
      <Navbar />
      <div style={mainContentStyle}>
        <SideBar />
        <div style={mainContentContainer}>
          <h1 style={contentHeading}>Welcome to Local E-commerce</h1>
          <p style={contentParagraph}>Connecting you to your community. Buy and sell with ease.</p>
          <div style={featuredProductContainer}>
            <h2 style={contentHeading}>Featured Products</h2>
            <div style={productContainer}>
            {getProducts()}
          </div>
          </div>
        </div>
      </div>

    </main>
  );
}
