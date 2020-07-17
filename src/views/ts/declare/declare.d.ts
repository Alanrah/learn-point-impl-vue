declare global {
    interface Window {
        init: () => void
    }
}
// Understand that an "external module" is a file containing an import or export statement, that an "ambient module declaration" reads declare module "m" {} (note the quotes), and reread the error message. 
// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul

export { }