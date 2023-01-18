import Navbar from "react-bootstrap/Navbar";
import PokeLogo from "../PokeLogo";
import CSS from "csstype";

type Props = {
  underCon: Function;
};
function TopBar(props: Props) {
  const navStyle: CSS.Properties = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <Navbar
        bg="white"
        variant="light"
        className=""
        style={navStyle}
      >
        <div>
          <PokeLogo
            underCon={() => {
              props.underCon();
            }}
          />
        </div>
      </Navbar>
    </>
  );
}

export default TopBar;
