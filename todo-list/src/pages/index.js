import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

export default function Home() {
  const [isEdit, setIsEdit] = useState([]);
  const [newTodoListContent, setNewTodoListContent] = useState("");

  const formik = useFormik({
    initialValues: {
      list: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#f5f5f5", padding: 3 }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          sx={{
            padding: 3,
            backgroundColor: "#ffffff",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            TODO LIST
          </Typography>

          <TextField
            label="Type a task and press Enter"
            fullWidth
            value={newTodoListContent}
            onChange={(e) => setNewTodoListContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const newListItem = {
                  content: newTodoListContent,
                  status: "pending",
                };
                formik.setFieldValue("list", [
                  ...formik.values.list,
                  newListItem,
                ]);
                setIsEdit([...isEdit, false]);
                setNewTodoListContent("");
              }
            }}
            sx={{ marginBottom: 2 }}
          />

          <List>
            {formik.values.list.map((listItem, itemIndex) => (
              <ListItem
                key={itemIndex}
                sx={{
                  padding: 1,
                  marginBottom: 1,
                  borderRadius: 1,
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                <ListItemText
                  sx={{
                    textAlign: "center",
                    color: listItem.status === "done" ? "#757575" : "inherit",
                  }}
                >
                  {itemIndex + 1}.
                </ListItemText>
                <ListItemText
                  sx={{
                    textDecoration:
                      listItem.status === "done" ? "line-through" : "none",
                    color: listItem.status === "done" ? "#757575" : "inherit",
                  }}
                >
                  {isEdit[itemIndex] ? (
                    <TextField
                      value={listItem.content}
                      onChange={(e) =>
                        formik.setFieldValue(
                          `list[${itemIndex}].content`,
                          e.target.value
                        )
                      }
                      fullWidth
                      variant="outlined"
                      sx={{ color: "#1976d2" }}
                    />
                  ) : (
                    listItem.content
                  )}
                </ListItemText>
                <ListItemButton
                  onClick={() =>
                    formik.setFieldValue(
                      `list[${itemIndex}].status`,
                      listItem.status === "pending" ? "done" : "pending"
                    )
                  }
                  sx={{
                    color: listItem.status === "done" ? "#388e3c" : "#1976d2",
                    fontWeight: "bold",
                    minWidth: "120px",
                  }}
                >
                  {listItem.status === "pending"
                    ? "Mark as Done"
                    : "Mark as Pending"}
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    const newEditList = [...isEdit];
                    newEditList[itemIndex] = !newEditList[itemIndex];
                    setIsEdit(newEditList);
                  }}
                  sx={{
                    color: isEdit[itemIndex] ? "#388e3c" : "#1976d2",
                    minWidth: "80px",
                  }}
                >
                  {isEdit[itemIndex] ? "Save" : "Edit"}
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    formik.setFieldValue(
                      "list",
                      formik.values.list.filter(
                        (_, index) => index !== itemIndex
                      )
                    );
                    setIsEdit(isEdit.filter((_, index) => index !== itemIndex));
                  }}
                  sx={{ color: "#d32f2f" }}
                >
                  Delete
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button variant="contained" onClick={formik.handleSubmit}>
            Submit
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
