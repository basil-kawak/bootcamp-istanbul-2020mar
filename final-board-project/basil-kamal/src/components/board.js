import { Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // npm i react-hook-form ***********1
import fire from "./../containers/db";
import uid from "uid";
import Modal from "./modal";
import AddBoardBtn from "./addBoardBtn";
import AddItem from "./addItem";
import Item from "./item";
import EditItem from "./editItem";

const Board = () => {
  const [FormOn, setFormOn] = useState("");
  const [Board, setBoard] = useState([]);
  const [ModalOn, setModalOn] = useState(false);
  const [InputState, setInputState] = useState("");
  const [EditItemState, setEditItemState] = useState({ open: false });
  const [OnEditItem, setOnEditItem] = useState({});

  // fetching the Data reuseable function
  const fetchData = async () => {
    const res = await fire.collection("posts").orderBy("title", "desc").get(); //[]
    const posts = await res.docs.map((post) => post.data());
    setBoard(posts);
  };

  //handle the board function to add new board
  const addBoard = async (e) => {
    e.preventDefault();
    const uniID = uid();
    let newBoard;
    // if Board is empty
    if (Board.length === 0) {
      newBoard = await [
        {
          id: uniID,
          title: InputState,
          cardList: [],
        },
      ];
      setBoard(newBoard);
      const insert = await fire.doc(`posts/${newBoard[0].id}`).set(newBoard[0]);
    } else {
      newBoard = await {
        id: uniID,
        title: InputState,
        cardList: [],
      };

      const insertnow = await fire
        .doc(`posts/${newBoard.id}`)
        .set({ id: uniID, title: InputState, cardList: [] });
      setBoard([newBoard, ...Board]);
    }
    setModalOn(false);
  };
  
  const deleteBoard = async (id) => {
    try {
      const deleteFromBase = await fire.collection("posts").doc(id).delete();
      const board = await Board.filter((el) => el.id !== id);
      setBoard(board);
    } catch (err) {
      console.log(err);
    }
  };

  // adding cardList
  const { register, handleSubmit } = useForm();
  //const { registerEdit, handleSubmitEdit } = useForm();
  const onSubmit = async (data) => {
    const uniID = uid();
    const oldBoard1 = await Board.filter((el) => el.id === FormOn);
    const oldBoard = await oldBoard1[0];
    const dataWithStatus = await { ...data, complated: false, id: uniID };
    const newCardList = await [...oldBoard.cardList, dataWithStatus];
    const index = await Board.indexOf(oldBoard);
    const { id, title } = await oldBoard;
    const newBoard = await { id, title, cardList: newCardList };
    // update Text state
    const finalData = await [
      ...Board.slice(0, index),
      newBoard,
      ...Board.slice(index + 1),
    ];
    setBoard(finalData);
    const saveDate = await fire.collection("posts").doc(FormOn).update({
      cardList: newCardList,
    });
    setFormOn("");
  };

  const deleteItem = async (boardId, itemId) => {
    const oldBoard1 = await Board.filter((el) => el.id === boardId);
    const oldBoard = await oldBoard1[0];
    const newCardList = await oldBoard.cardList.filter(
      (el) => el.id !== itemId
    );
    const { id, title } = await oldBoard;
    const newBoard = await { id, title, cardList: newCardList };

    // update Text state
    const index = await Board.indexOf(oldBoard);
    const finalData = await [
      ...Board.slice(0, index),
      newBoard,
      ...Board.slice(index + 1),
    ];
    setBoard(finalData);
    const saveDate = await fire
      .collection("posts")
      .doc(boardId)
      .update(newBoard);
  };

  // editItem
  const StartEditItem = (board, item) => {
    setEditItemState({
      open: true,
      board,
      item,
    });
    setOnEditItem(item);
  };
  // handling edit submiting
  const submitingEdit = async (data) => {
    // get item from EditItemState
    const oldItem = await EditItemState.item;
    const oldBoard = await EditItemState.board;
    const newItem = await {
      ...oldItem,
      title: data.EditTitle,
      dueDate: data.EditDueDate,
      note: data.EditNote,
    };

    const ItemIndex = await oldBoard.cardList.indexOf(oldItem);
    const BoardIndex = await Board.indexOf(oldBoard);

    const newCardList = await [
      ...oldBoard.cardList.slice(0, ItemIndex),
      newItem,
      ...oldBoard.cardList.slice(ItemIndex + 1),
    ];

    const newBoard = await {
      id: oldBoard.id,
      title: oldBoard.title,
      cardList: newCardList,
    };

    const finalData = await [
      ...Board.slice(0, BoardIndex),
      newBoard,
      ...Board.slice(BoardIndex + 1),
    ];

    setBoard(finalData);
    setOnEditItem({});
    setEditItemState({ open: false });
    const saveDate = fire
      .collection("posts")
      .doc(oldBoard.id)
      .update({ cardList: newCardList });
  };
  const StartEditItemOff = () => {
    setEditItemState({ open: false });
  };
  //turn modal on/off
  const SwitchModal = () => {
    setModalOn(!ModalOn);
  };
  //turn modal off
  const ModalOff = () => {
    setModalOn(false);
  };
  // get value od add Board input
  const getBoardInputData = (e) => {
    setInputState(e.target.value);
  };

  const emptyForm = () => {
    setFormOn("");
  };
  const assignForm = (id) => {
    setFormOn(id);
  };
  const markAsCompleted = async (oldBoard, oldItem) => {
    // get item from EditItemState
    const newItem = await {
      ...oldItem,
      complated: true,
    };

    const ItemIndex = await oldBoard.cardList.indexOf(oldItem);
    const BoardIndex = await Board.indexOf(oldBoard);

    const newCardList = await [
      ...oldBoard.cardList.slice(0, ItemIndex),
      newItem,
      ...oldBoard.cardList.slice(ItemIndex + 1),
    ];

    const newBoard = await {
      id: oldBoard.id,
      title: oldBoard.title,
      cardList: newCardList,
    };

    const finalData = await [
      ...Board.slice(0, BoardIndex),
      newBoard,
      ...Board.slice(BoardIndex + 1),
    ];

    setBoard(finalData);
    const saveDate = fire
      .collection("posts")
      .doc(oldBoard.id)
      .update({ cardList: newCardList });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="con">
      <Modal
        SwitchModal={SwitchModal}
        ModalOff={ModalOff}
        ModalOn={ModalOn}
        getBoardInputData={getBoardInputData}
        addBoard={addBoard}
      />
      <AddBoardBtn SwitchModal={SwitchModal} />

      <div className="boardcon">
        {Board.map((board) => (
          <Card key={uid()} style={{ width: "25rem" }} className="cards">
            <AddItem
              board={board}
              FormOn={FormOn}
              emptyForm={emptyForm}
              assignForm={assignForm}
              register={register}
              submiting={handleSubmit(onSubmit)}
              deleteBoard={deleteBoard}
            />

            <Card.Body>
              <Card.Title>{board.title}</Card.Title>
              <Card.Title>{board.id}</Card.Title>
              <Item
                board={board}
                deleteItem={deleteItem}
                StartEditItem={StartEditItem}
                markAsCompleted={markAsCompleted}
              />
              <EditItem
                EditItemState={EditItemState}
                StartEditItemOff={StartEditItemOff}
                OnEditItem={OnEditItem}
                registerEdit={register}
                submitingEdit={handleSubmit(submitingEdit)}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Board;
