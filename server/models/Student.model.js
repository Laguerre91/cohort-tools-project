const { model, Schema } = require('mongoose')

const studentSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    linkedinUrl: {
        type: String,
        default: ''
    },
    languages: {
        type: [String],
        enum: ['english', 'spanish', 'french', 'german', 'portuguese', 'dutch', 'other']
    },
    program: {
        type: String,
        enum: ['Web dev', 'UX/UI', 'Data Analystics', 'Cybersecurity']
    },
    background: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: 'https://i.imgur.com/r8bo8u7.png'
    },
    cohort: {
        type: Schema.Types.ObjectId,
        ref: 'Cohort'
    },
    projects: {
        type: Array,
    }
}, {
    timestamps: true
});

const Student = model("Student", studentSchema);

module.exports = Student 