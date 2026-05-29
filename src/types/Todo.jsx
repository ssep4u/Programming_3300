class Todo {
    constructor(text, deadline) {
        this.id = Date.now();   //할일 id: 고유의 값 == new Date().getTime()
        this.text = text;       //할일의 내용
        this.isCompleted = false; //할일 완료 여부
        this.deadline = deadline;
    }
}

export { Todo }