import { useCallback, useState } from "react";

export const useModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
   
     const handleOpen = useCallback(() => {
       setModalVisible(true);
     }, []);
   
     const handleClose = useCallback(() => {
       setModalVisible(false);
     }, []);
   
     const handleSubmit = useCallback(() => {
       setModalVisible(false);
     }, []);
   
     return {
       modalVisible,
       handleOpen,
       handleClose,
       handleSubmit,
     }
   }