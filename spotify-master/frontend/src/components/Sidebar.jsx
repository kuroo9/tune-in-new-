import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { UserData } from "../context/User";
import { SongData } from "../context/Song"; // Import SongData to access songs and albums
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

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.text};
  margin-bottom: 16px;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = UserData();
  const { songs, albums } = SongData(); // Access songs and albums from context
  const [searchQuery, setSearchQuery] = useState("");

  // Filter songs and albums based on the search query
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.singer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          >
            <img src={assets.search_icon} className="w-6" alt="" />
            <p className="font-bold">Search</p>
          </NavLink>
          <SearchInput
            type="text"
            placeholder="Search for songs or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Display filtered results dynamically */}
          {searchQuery && (
            <div className="bg-[#2B2B2B] p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Songs</h3>
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song, index) => (
                  <div key={index} className="mb-2">
                    <p>{song.title} - {song.singer}</p>
                  </div>
                ))
              ) : (
                <p>No songs found.</p>
              )}
              <h3 className="font-semibold mt-4 mb-2">Albums</h3>
              {filteredAlbums.length > 0 ? (
                filteredAlbums.map((album, index) => (
                  <div key={index} className="mb-2">
                    <p>{album.title}</p>
                  </div>
                ))
              ) : (
                <p>No albums found.</p>
              )}
            </div>
          )}
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