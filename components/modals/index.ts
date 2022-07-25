import ItemModal from "./ItemModal";
import PayeeModal from "./PayeeModal";

enum ModalType {
	NONE = "none",
	PAYEE = "payee",
	ITEM = "item",
	PAYMENT = "payment",
	TRANSACTION = "transaction"
}

export { ModalType, ItemModal, PayeeModal };
