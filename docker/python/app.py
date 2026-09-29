from http.server import BaseHTTPRequestHandler, HTTPServer


class HelloHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"Hola mundo desde Python")

    def log_message(self, format, *args):
        return


server = HTTPServer(("0.0.0.0", 5000), HelloHandler)
server.serve_forever()
