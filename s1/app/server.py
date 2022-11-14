from http.server import BaseHTTPRequestHandler
from http.server import HTTPServer

class Server(BaseHTTPRequestHandler):
  def do_GET(self):
    if self.path == '/':
      self.send_response(200)
      self.send_header("Content-type", "text/html")
      self.end_headers()
      self.wfile.write(bytes("Hello world", "utf-8"))
    else:
      self.send_response(404)
      self.wfile.write(bytes("Not found", "utf-8"))
      
httpd = HTTPServer(('localhost',1234),Server)

try:
  print('Server started at http://localhost:1234')
  httpd.serve_forever()
except KeyboardInterrupt:
  pass

httpd.server_close()
print("Server stopped.")
