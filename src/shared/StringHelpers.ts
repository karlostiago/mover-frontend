export class StringHelpers {
    static capitalizeFirstLetter(value: string) {
        const lowerText = value.toLowerCase();
        return lowerText.charAt(0).toUpperCase() + lowerText.slice(1);
    }
}
