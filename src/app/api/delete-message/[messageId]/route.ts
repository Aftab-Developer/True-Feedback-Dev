import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { dbConnect } from "@/utils/dbConnect";
import { userModel } from "@/models/UserModel";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

export async function DELETE(request: NextRequest, { params }: { params: { messageId: string } }) {
    const session = await getServerSession(authOptions);
    
    if (!session || !session?.user) {
        return NextResponse.json({ message: "Not Authenticated", success: false }, { status: 401 });
    }
    
    const { messageId } = params;

   const messageid = new mongoose.Types.ObjectId(messageId)
   

    try {
        await dbConnect();
        
        const user = await userModel.updateOne(
            { _id: session.user._id },
            { $pull: { messages: { _id: messageid } } }
        );

        if (user.modifiedCount === 0) {
            return NextResponse.json({ message: "Message not found or already deleted", success: false }, { status: 400 });
        }

        return NextResponse.json({ message: "Message Deleted", success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error Deleting Message", success: false }, { status: 500 });
    }
}
