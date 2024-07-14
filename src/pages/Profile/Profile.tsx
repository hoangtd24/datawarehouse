import { Drawer, Modal, Pagination, useMediaQuery } from "@mui/material";
import classNames from "classnames/bind";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { images } from "../../assets/images";
import { useAuth } from "../../context/UserContext";
import styles from "./Profile.module.scss";
import api from "../../common/api";

type CreatePostInput = {
  title: string;
  description: string;
  tags: string[];
};
type Post = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

const cx = classNames.bind(styles);
const Profile = () => {
  const matches = useMediaQuery("(max-width:900px)");

  const { logoutClient } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [postId, setPostId] = useState<string | null>(null);
  const [create, setCreate] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [state, setState] = useState({
    left: false,
  });

  const { register, handleSubmit, setValue } = useForm<CreatePostInput>({});

  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const getPosts = async () => {
    const params: {
      page: number;
      title?: string;
      tags?: string;
    } = {
      page: 1,
    };
    params.page = page;
    if (title) {
      console.log(title);
      params.title = title;
    }
    if (tag) {
      params.tags = tag;
    }
    const result = await api.get("posts", {
      params: params,
    });
    if (result.status === 200) {
      setPosts(result.data?.posts);
      setTotalPage(result.data?.total_page);
    }
  };
  const getTags = async () => {
    const result = await api.get("posts/tags");
    if (result.status === 200) {
      setTags(result.data);
    }
  };

  const onSubmit: SubmitHandler<CreatePostInput> = async (data) => {
    const result = await api.post("posts", data);
    if (result.status === 201) {
      setCreate(false);
    }
  };
  const onEdit: SubmitHandler<CreatePostInput> = async (data) => {
    await api.patch(`posts/${postId}`, data);

    setEdit(false);
  };
  const logOut = async () => {
    await api.post("auth/logout");
    logoutClient();
  };
  const deletePost = async (id: string) => {
    await api.delete(`posts/${id}`);
    setDeleted(!deleted);
  };
  useEffect(() => {
    getPosts();
  }, [page, title, tag, create, edit, deleted]);
  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
      <div className={cx("sidenav")}>
        <div className={cx("logo")}>
          <img src={images.logo} alt="logo" />
        </div>
        <div className={cx("sidebar-action")}>
          <button>Posts</button>
          <button
            onClick={() => {
              logOut();
              logoutClient();
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className={cx("main")}>
        <div className={cx("actions")}>
          <button className={cx("addnew-btn")} onClick={() => setCreate(true)}>
            Add new
          </button>
          <div className={cx("search_wrap")}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              defaultValue={""}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option selected value="">
                Tags
              </option>
              {tags.map((tag: string) => (
                <option value={tag} key={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className={cx("table")}>
            <tr>
              <th style={{ width: "15%" }}>ID</th>
              <th>Title</th>
              <th style={{ width: "50%" }}>Description</th>
              <th>Tags</th>
              <th style={{ width: "10%" }}>Actions</th>
            </tr>
            {posts.length > 0 ? (
              posts?.map((post: Post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.tags.toString()}</td>
                  <td>
                    <button
                      className={cx("edit-btn")}
                      onClick={() => {
                        setPostId(post.id);
                        setValue("title", post.title);
                        setValue("description", post.description);
                        setValue("tags", post.tags);
                        setEdit(true);
                      }}
                    >
                      <img src={images.edit} />
                    </button>
                    <button
                      className={cx("delete-btn")}
                      onClick={() => deletePost(post.id)}
                    >
                      <img src={images.deleteIcon} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>No posts available</tr>
            )}
          </table>
        </div>
        {!!totalPage && (
          <div className={cx("pagination")}>
            <Pagination
              count={totalPage}
              color="secondary"
              size="large"
              page={page}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
      <Modal
        open={create}
        onClose={() => setCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ marginX: "24px" }}
      >
        <div className={cx("content")}>
          <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
            <div className={cx("input-item")}>
              <label htmlFor="title">Title</label>
              <input
                {...register("title")}
                id="title"
                className={cx("input")}
              />
            </div>
            <div className={cx("input-item")}>
              <label htmlFor="description">Description</label>
              <input
                {...register("description")}
                id="description"
                className={cx("input")}
              />
            </div>
            <div className={cx("input-item")}>
              <label htmlFor="tags">Tags</label>
              <div>
                {tags.map((tag: string) => (
                  <div className={cx("tag-item")} key={tag}>
                    <input
                      {...register("tags")}
                      id={tag}
                      className={cx("input")}
                      type="checkbox"
                      value={tag}
                    />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("btn-wrap")}>
              <input
                type="submit"
                className={cx("cancel_btn")}
                value="Cancel"
                onClick={() => setCreate(false)}
              />
              <input
                type="submit"
                className={cx("submit_btn")}
                value="Create"
              />
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ marginX: "24px" }}
      >
        <div className={cx("content")}>
          <form className={cx("form")} onSubmit={handleSubmit(onEdit)}>
            <div className={cx("input-item")}>
              <label htmlFor="title">Title</label>
              <input
                {...register("title")}
                id="title"
                className={cx("input")}
              />
            </div>
            <div className={cx("input-item")}>
              <label htmlFor="description">Description</label>
              <input
                {...register("description")}
                id="description"
                className={cx("input")}
              />
            </div>
            <div className={cx("input-item")}>
              <label htmlFor="tags">Tags</label>
              <div>
                {tags.map((tag: string) => (
                  <div className={cx("tag-item")} key={tag}>
                    <input
                      {...register("tags")}
                      id={tag}
                      className={cx("input")}
                      type="checkbox"
                      value={tag}
                    />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("btn-wrap")}>
              <input
                type="submit"
                className={cx("cancel_btn")}
                value="Cancel"
                onClick={() => setEdit(false)}
              />
              <input type="submit" className={cx("submit_btn")} value="Edit" />
            </div>
          </form>
        </div>
      </Modal>
      {matches &&
        (["left"] as const).map((anchor) => (
          <Fragment key={anchor}>
            <span
              onClick={toggleDrawer(anchor, true)}
              className={cx("menu_icon")}
            >
              {`>`}
            </span>
            <Drawer
              anchor={"left"}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <div className={cx("filter-wrapper")}>
                <div className={cx("filter-header")}>
                  <span className={cx("filter-lable")}>Filters</span>
                  <span className={cx("filter-clear")}>Clean All</span>
                </div>
                <div className={cx("filter-content")}>
                  <div className={cx("sidenav_small")}>
                    <div className={cx("logo")}>
                      <img src={images.logo} alt="logo" />
                    </div>
                    <div className={cx("sidebar-action")}>
                      <button>Posts</button>
                      <button
                        onClick={() => {
                          logOut();
                          logoutClient();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer>
          </Fragment>
        ))}
    </div>
  );
};

export default Profile;
