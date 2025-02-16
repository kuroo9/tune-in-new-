import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { UserData } from "../context/User";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.text};
    transition: background-color 0.3s, color 0.3s;
  }
`;

const darkTheme = {
  bg: "#000",
  text: "#fff",
  primary: "#333",
  secondary: "#555",
};

const SidebarContainer = styled.div`
  width: 25%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.bg};
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Section = styled(motion.div)`
  background-color: ${props => props.theme.secondary};
  border-radius: 8px;
  padding: 16px;
`;

const NavLink = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.primary};
    border-radius: 4px;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = UserData();

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <SidebarContainer>
        <Section>
          <NavLink
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/")}
          >
            <img src={assets.home_icon} className="w-6" alt="" />
            <p className="font-bold">Home</p>
          </NavLink>
          <NavLink
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/")}
          >
            <img src={assets.search_icon} className="w-6" alt="" />
            <p className="font-bold">Search</p>
          </NavLink>
        </Section>

        <Section>
          <div className="flex items-center gap-3">
            <img src={assets.stack_icon} className="w8-" alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/playlist")}
          >
            <PlayListCard />
          </motion.div>
        </Section>

        <Section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-semibold">Let's find some podcasts to follow</h1>
            <p className="font-light">We'll keep you updated on new episodes</p>
            <button
              className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4"
              onClick={() => navigate("/podcasts")}
            >
              Browse Podcasts
            </button>
          </motion.div>
        </Section>

        {user && user.role === "admin" && (
          <Section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4"
                onClick={() => navigate("/admin")}
              >
                ARTIST Dashboard
              </button>
            </motion.div>
          </Section>
        )}
      </SidebarContainer>
    </ThemeProvider>
  );
};

export default Sidebar;