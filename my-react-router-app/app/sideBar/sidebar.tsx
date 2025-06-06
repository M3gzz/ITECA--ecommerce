
export function SideBar() {

  const sideBarContainer = {
    width: "15rem",
    height: "100%",
    backgroundColor: "#153B50",
    display: "flex"
  }

  const sideBarContent = {
    display: "block",
    width: "fit-content",
    padding: "20px",


  }

  const sideBarHeading = {
    color: "#30C5FF",
    margin: "0",

  }

  const sideBarLinksContainer = {
    color: "white",
    marginTop: "10px",

  }

  const sideBarLink = {
    textDecoration: "underline",
    color: "white",
    display: "block",
    margin: "5px"
  }
  return (
      <div style={sideBarContainer}>
        <div style={sideBarContent}>
          <h2 style={sideBarHeading}>Categories</h2>
          <div style={sideBarLinksContainer}>
            <a href="/products/household" style={sideBarLink}> Household items</a>
            <a href="/products/motorVehicles" style={sideBarLink}> Motor Vehicles</a>
            <a href="/products/electronics" style={sideBarLink}> Electronics</a>
          </div>
        </div>

      </div>
   
  );
}