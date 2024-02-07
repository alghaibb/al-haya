import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../components/ui/alert-dialog";
import { Button } from "../ui/button";

import "./alertdialog.styles.css";

interface CustomAlertDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  title,
  description,
  onConfirm,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="clearCartBtn">
          Clear Cart
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="alertDialogFooter">
          <AlertDialogCancel>
            <Button className="alertCancelBtn">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={onConfirm}>
            <Button className="alertContinueBtn">Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
