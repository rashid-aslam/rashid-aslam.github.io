export default function getOlid(key) {
    return key ? key.replace('/books/', '') : null;
}