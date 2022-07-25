import ItemModal from "./ItemModal";
import PayeeModal from "./PayeeModal";
import PaymentModal from "./PaymentModal";

enum ModalType {
	NONE = "none",
	PAYEE = "payee",
	ITEM = "item",
	PAYMENT = "payment",
	TRANSACTION = "transaction"
}

export { ModalType, ItemModal, PayeeModal, PaymentModal };
