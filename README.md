# Postra

Postra is a social media app that updates like counts in real-time. Using `client/index.html`:

1. Connect to the WebSocket server at `/socket-server`. Hint: You must set the full URL, including the WebSocket protocol and host, which you can get with `` `ws://${window.location.host}/socket-server` ``
2. Every 2 seconds, the socket will receive a message with an updated like count. Add an event listener for it.
3. In its event handler, update the content of the `.likes` span with the message data.

## Setup

Run `npm install` from the root directory once. Then, start the server with `npm start`.

## Stretch Challenge

If you send the message `"all"` to the socket server, you'll upgrade the feed from the socket server from one count to an array of counts. 

1. Copy the existing HTML to create four `.card` divs. Use any name, image, and message you like. Give them `data-user-id` attributes of `"A"`, `"B"`, `"C"`, and `"D"`.
2. When the socket connection opens, send the message `"all"` to the socket server
3. Update your message listener to iterate through the array of data that it gets back, updating the like counts on each on card. Hint: Use the `[data-user-id]` selector to target the correct like element.
4. Arrange the cards in a grid using the `client/index.css` file.
