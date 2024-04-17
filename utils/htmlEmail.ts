export function html({ url, text }: { url: string; text: string }) {
  return `
   <div
      style="
        max-width: 700px;
        margin: auto;
        border: 10px solid #ddd;
        padding: 50px 20px;
      "
    >
      <h2>Ласкаво просимо до інтернет магазину запчастин</h2>

      <a
        href=${url}
        style="
          background: crimson;
          text-decoration: none;
          color: white;
          padding: 10px 20px;
          margin: 10px 0px;
          display: inline-block;
        "
        >${text}</a
      >

      <p>
        Якщо кнопка з якихось причин не працює, ви також можете натиснути на
        посилання нижче
      </p>

      <div>${url}</div>
    </div>
  `;
}
