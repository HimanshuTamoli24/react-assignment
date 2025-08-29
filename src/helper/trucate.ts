
interface shape {
    text: string;
    windowWidth: number
}
export const repsonsiveTruncate = ({ text, windowWidth }: shape) => {

    return windowWidth < 640 ? text.slice(0, 5) + "..." : text;


}