
export function SideBar(props: { changeCategory: (category: string) => void }) {

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
    margin: "5px",
    cursor: "pointer",
  }



  return (
      <div style={sideBarContainer}>
        <div style={sideBarContent}>
          <h2 style={sideBarHeading}>Categories</h2>
          <div style={sideBarLinksContainer}>
            <span style={sideBarLink} onClick={() => props.changeCategory('2')}> Household items</span>
            <span style={sideBarLink} onClick={() => props.changeCategory('3')}> Motor Vehicles</span>
            <span style={sideBarLink} onClick={() => props.changeCategory('1')}> Electronics</span>
            <span style={sideBarLink} onClick={() => props.changeCategory('4')}> Clothing</span>
          </div>
        </div>

      </div>
   
  );
}