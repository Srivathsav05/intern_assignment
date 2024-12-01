import mongoose, { Document, Schema } from 'mongoose';

interface IAssignment extends Document {
    userId: mongoose.Types.ObjectId;
    adminId: mongoose.Types.ObjectId;
    task: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
}

const assignmentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model<IAssignment>('Assignment', assignmentSchema);

export default Assignment;
export { IAssignment };
