"use client"
import { message } from "@/models/UserModel"
import dayjs from "dayjs" ;
import { Loader2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast, useToast } from "@/hooks/use-toast";

type MessegeProps = {
    message : message,
    onMessegeDelete : (id:unknown) => void   , 
}
const MessageCard = ({message , onMessegeDelete }:MessegeProps) => { 
const {toast} = useToast() ;   
  
const handleConfirmDelete = async () => {
  onMessegeDelete (message._id); 
  try {
    const response = await fetch(`/api/delete-message/${message._id}`,{
      method : "DELETE"
    }) ; 
    const jsonRes = await response.json() ; 
    if(jsonRes.success) {
      toast({
        title: jsonRes.message,
      });
    }
  } catch (error) {
     console.error(error);
     
  }
}
  return (
    <Card className="card-bordered">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>{message.content}</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                this message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction  onClick={handleConfirmDelete}>
               continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="text-sm">
        {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
      </div>
    </CardHeader>
    <CardContent></CardContent>
  </Card>
);
  
}

export default MessageCard
