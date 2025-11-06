export function getPostMbiQuestions() {
    return fetch("/motor_post_mbi.json")
        .then((res) => res.json())
        .then((data) => data)
}