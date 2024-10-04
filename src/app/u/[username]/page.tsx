

"use client"

import {  useState } from "react";
// import { useCompletion } from "ai/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/schemas/messageSchema";
// import { useParams } from "next/navigation";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";


const MessageArr = [
  "What's your favourate hobby ?",
  "Do you Like Cats ? ?",
  "What's your good Day?",
  "What's your father name ?"

];


const Page = () => {
  let [Arr, setArr] = useState<string[]>(MessageArr);
  const [stages, setStages] = useState<string>("stage1");
  const { toast } = useToast();
  const [isLoading, setIsloading] = useState<boolean>(false);   
  const {data:session} = useSession() ;

  // All code which are commented are Ai Integration code the api is
  // paid and my quota is complete thats why i dont use that ...

  // const {complete , completion , isLoading :isSuggestLoading,error } =
  //  useCompletion({
  //     api : "/api/chat" ,
  //     initialCompletion:initialMessageString
  //  })    
  // const specialChar = "||" ;   
  // let msg =
  //   "What's your favorite movie?||Do you have any pets?||What's your dream job?";
  // const parseString = (messageString:string): string[] => {
  //    return messageString.split(specialChar) ;
  // }  
  // const parseStringMessages = (messageString: string): string[] => {
  //   return messageString.split(specialChar);
  // };
  // const generateMessages = async () => {
  //     try {
  //       complete('') ;
  //     } catch (error) {
  //       console.error(error)
  //     }
  // }   

  // Add that code in CardContent tag 

  // {error ? (
  //   <p className="text-red-500">{error.message}</p>
  // ) : (
  //   parseStringMessages(completion).map((message, index) => (
  //     <Button
  //       key={index}
  //       variant="outline"
  //       className="mb-2"
  //       onClick={() => handleMessageClick(message)}
  //     >
  //       {message}
  //     </Button>
  //   ))
  // )} 


  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ""
    }
  });

  const Message = form.watch('content');

  const getMessageFromInput = (message: string) => {
    form.setValue('content', message)
  }
  let username = session?.user.username ?? session?.user.name ;


  const onSubmit = async (data?: z.infer<typeof messageSchema>) => {
    setIsloading(true);
    try {
      const response = await fetch("/api/create-messege", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, content: data?.content })
      });
      const dataJson = await response.json();
      if (dataJson.success) {
        toast({
          title: "Success",
          description: dataJson.message,
        })
        form.reset({ ...form.getValues(), content: '' });
      } else {
        toast({
          title: "Error",
          description: dataJson.message,
        })
      }
    } catch (error) {
      console.error(error);

    } finally {
      setIsloading(false);
    }



    //I dont have upgraded api key the is paid and my quota is full thats why i am 
    // not using it but the code is in working stage

    // const generateMessages = async () => {
    //   // try {
    // //   complete('')
    // // } catch (error) {
    // //   console.error('Error fetching messages:', error);
    // // }
    // }

  }

  const generateMessages = () => {
    if (stages === "stage1") {
      setArr([
        "Do you have a coute sister ?",
        "What is your best programming language ?",
        "Is Python is the best language ?"
      ]);
      setStages("stage2")
    } else if (stages === "stage2") {
      setArr([
        "Do you Like Books ?",
        "What is your Profession ?",
        "Do You Like Cats "
      ]);
      setStages("stage3")
    } else if (stages === "stage3") {
      setArr([
        "Whats your dream job ?",
        "Do you Like your Mother ?",
        "Do you have a car ?"
      ]);
      setStages("stage1")
    }
  }

  return (
    <>
      <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Public Profile Link
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-start mt-4 ">
              {isLoading ? (
                <Button className="mb-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  Send It
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="space-y-4 my-8">
          <div className="space-y-2">
            <Button
              onClick={generateMessages}
              className="my-4"
            // disabled={isSuggestLoading}
            >
              Suggest Messages
            </Button>
            <p>Click on any message below to select it.</p>
          </div>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Messages</h3>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {
                Arr.map((message, index) =>
                (
                  <Button
                    key={index}
                    variant="outline"
                    className="mb-2"
                    onClick={() => getMessageFromInput(message)}
                  >
                    {message}
                  </Button>
                )
                )
              }
            </CardContent>
          </Card>
        </div>
        <Separator className="my-6" />
        <div className="text-center">
          <div className="mb-4">Get Your Message Board</div>
          <Link href={'/sign-up'}>
            <Button>Create Your Account</Button>
          </Link>
        </div>
      </div>
    </>

  )
}

export default Page










