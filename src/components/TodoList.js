import React, { useState, useEffect } from "react";
import { DetailsList, Checkbox } from "@fluentui/react";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import todos from "../data/todos";

const TodoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState("");
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(todos);
  }, []);

  const columns = [
    {
      key: "title",
      name: "Title",
      fieldName: "title",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true
    },
    {
      key: "status",
      name: "Complete Status",
      fieldName: "complete",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true
    },
    {
      key: "created_at",
      name: "Date Created",
      fieldName: "created_at",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true
    },
    {
      key: "edit",
      name: "Edit",
      fieldName: "edit",
      isResizable: false,
      onRender: selectedItem => (
        <Button
          buttonType={ButtonType.primary}
          onClick={() => {
            setItem(selectedItem);
            setId(selectedItem.id);
            setIsChecked(selectedItem.complete);
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      )
    }
  ];

  let styles = {
    root: {
      marginTop: "10px",
      backgroundColor: "#ECC1B8",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingLeft: "10px"
    }
  };

  const handleChange = e => {
    setItem(prevItem => {
      return { ...prevItem, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setItems(
      items.map(item =>
        item.id === id
          ? {
              ...item,
              title: e.target.title.value,
              complete: isChecked,
              created_at: e.target.created_at.value
            }
          : item
      )
    );
    setIsOpen(false);
  };

  return (
    <div data-is-scrollable={true}>
      <div className="s-Grid-col ms-sm9 ms-xl9">
        <DetailsList items={items} columns={columns} selectionMode={0} />
      </div>
      <Dialog
        isOpen={isOpen}
        type={DialogType.close}
        title="Todo Item"
        isBlocking={false}
        closeButtonAriaLabel="Close"
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title:"
            name="title"
            value={item.title}
            onChange={handleChange}
            styles={{ root: { maxWidth: "300px" } }}
          />
          <TextField
            label="Created Date:"
            name="created_at"
            value={item.created_at}
            onChange={handleChange}
            styles={{ root: { maxWidth: "300px" } }}
          />
          <Checkbox
            label="Complete"
            name="complete"
            onChange={() => setIsChecked(!isChecked)}
            checked={isChecked}
            styles={styles}
          />
          <DialogFooter>
            <Button buttonType={ButtonType.primary} type="submit">
              OK
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default TodoList;
