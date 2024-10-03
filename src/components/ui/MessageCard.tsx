"use client"
import { message } from "@/models/UserModel"
import { useToast } from "./hooks/use-toast" 
import dayjs from "dayjs" ;
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";

type MessegeProps = {
    message : message ,
    onMessegeDelete : (id:unknown) => void  
}
const MessageCard = ({message , onMessegeDelete}:MessegeProps) => {   
    const {toast} = useToast() ;
    const handleDelete = async () => {
       try {
        const response = await fetch(`api/delete-messege/${message._id}`) ;
        if(response.status === 200) {
            toast({ 
                   variant : "default" ,
                   title: "Messege deleted successfully",
                   description: "The message has been deleted successfully"
                   
     
            }) ; 
            onMessegeDelete(message._id) ;
        } 

        toast({ 
            variant : "destructive" ,
            title: "Error",
            description: "Messege not deleted successfully"
     }) ; 

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
              <AlertDialogAction onClick={handleDelete}>
                Continue
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
