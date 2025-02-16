import React, { useState } from "react";
import { UserData } from "../context/User";
import { Link, useNavigate } from "react-router-dom";
import { SongData } from "../context/Song";
import { MdDelete, MdAdd, MdEdit } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Admin = () => {
  const { user } = UserData();
  const {
    albums,
    songs,
    addAlbum,
    loading,
    addSong,
    addThumbnail,
    deleteSong,
    deleteAlbum,
  } = SongData();
  const navigate = useNavigate();

  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  // Separate states for album and song forms
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumFile, setAlbumFile] = useState(null);

  const [songTitle, setSongTitle] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [songSinger, setSongSinger] = useState("");
  const [songAlbum, setSongAlbum] = useState("");
  const [songFile, setSongFile] = useState(null);

  const fileChangeHandler = (e, setState) => {
    const file = e.target.files[0];
    setState(file);
  };

  const addAlbumHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", albumTitle);
    formData.append("description", albumDescription);
    formData.append("file", albumFile);

    try {
      await addAlbum(formData, setAlbumTitle, setAlbumDescription, setAlbumFile);
      toast.success("Album added successfully!");
    } catch (error) {
      toast.error("Failed to add album.");
    }
  };

  const addSongHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", songTitle);
    formData.append("description", songDescription);
    formData.append("singer", songSinger);
    formData.append("album", songAlbum);
    formData.append("file", songFile);

    try {
      await addSong(
        formData,
        setSongTitle,
        setSongDescription,
        setSongFile,
        setSongSinger,
        setSongAlbum
      );
      toast.success("Song added successfully!");
    } catch (error) {
      toast.error("Failed to add song.");
    }
  };

  const addThumbnailHandler = async (id) => {
    const formData = new FormData();
    formData.append("file", songFile);

    try {
      await addThumbnail(id, formData, setSongFile);
      toast.success("Thumbnail added successfully!");
    } catch (error) {
      toast.error("Failed to add thumbnail.");
    }
  };

  const deleteSongHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      deleteSong(id);
      toast.success("Song deleted successfully!");
    }
  };

  const deleteAlbumHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this album?")) {
      deleteAlbum(id);
      toast.success("Album deleted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link
        to="/"
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-900 transition duration-300"
      >
        Go to home page
      </Link>

      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>

      <motion.form
        onSubmit={addAlbumHandler}
        className="bg-[#181818] p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400 bg-[#212121] text-white"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400 bg-[#212121] text-white"
            value={albumDescription}
            onChange={(e) => setAlbumDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400 bg-[#212121] text-white"
            accept="image/*"
            onChange={(e) => fileChangeHandler(e, setAlbumFile)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-900 transition duration-300"
          style={{ width: "100px" }}
        >
          {loading ? "Please Wait..." : "Add"}
        </button>
      </motion.form>

      <h2 className="text-2xl font-bold mb-6 mt-6">Add Songs</h2>

      <motion.form
        onSubmit={addSongHandler}
        className="bg-[#181818] p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400 bg-[#212121] text-white"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400 bg-[#212121] text-white"
            value={songDescription}
            onChange={(e) => setSongDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Singer</label>
          <input
            type="text"
            placeholder="Singer"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400 bg-[#212121] text-white"
            value={songSinger}
            onChange={(e) => setSongSinger(e.target.value)}
            required
          />
        </div>

        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400 bg-[#212121] text-white"
          value={songAlbum}
          onChange={(e) => setSongAlbum(e.target.value)}
        >
          <option value="">Choose Album</option>
          {albums &&
            albums.map((e, i) => (
              <option value={e._id} key={i}>
                {e.title}
              </option>
            ))}
        </select>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Audio</label>
          <input
            type="file"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400 bg-[#212121] text-white"
            accept="audio/*"
            onChange={(e) => fileChangeHandler(e, setSongFile)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-900 transition duration-300"
          style={{ width: "100px" }}
        >
          {loading ? "Please Wait..." : "Add"}
        </button>
      </motion.form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Albums</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {albums &&
              albums.map((e, i) => (
                <motion.div
                  key={i}
                  className="bg-[#181818] p-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={e.thumbnail.url}
                    alt={e.title}
                    className="mr-1 w-52 h-52"
                  />
                  <h4 className="text-lg font-bold">{e.title}</h4>
                  <h4 className="text-sm text-gray-500">{e.description}</h4>
                  <button
                    onClick={() => deleteAlbumHandler(e._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    <MdDelete />
                  </button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {songs &&
              songs.map((e, i) => (
                <motion.div
                  key={i}
                  className="bg-[#181818] p-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {e.thumbnail ? (
                    <img
                      src={e.thumbnail.url}
                      alt=""
                      className="mr-1 w-52 h-52"
                    />
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <input type="file" onChange={(e) => fileChangeHandler(e, setSongFile)} />
                      <button
                        onClick={() => addThumbnailHandler(e._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Add Thumbnail
                      </button>
                    </div>
                  )}

                  <h4 className="text-lg font-bold">{e.title}</h4>
                  <h4 className="text-sm text-gray-500">{e.singer}</h4>
                  <h4 className="text-sm text-gray-500">{e.description}</h4>

                  <button
                    onClick={() => deleteSongHandler(e._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    <MdDelete />
                  </button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Admin;