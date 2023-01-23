// 文章からURLを抽出する
export function detectURLs(message: string) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.match(urlRegex);
}

// リンク先が画像かどうかを判定する
export const checkIfImageExists = (url: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
    });
};
