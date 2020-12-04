/*
 * Copyright 2019 Amadeus s.a.s.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { createServer, AddressInfo } from "net";

/**
 * Returns a free TCP port on the local IP address specified by the host parameter.
 *
 * @param host - Specifies the local host name or IP address to use when looking for a free TCP port.
 * @returns An unused port number chosen by the operating system.
 *
 * @remarks
 *
 * This function internally creates a TCP server with port 0 so that,
 * as mentioned in the {@link https://nodejs.org/dist/latest-v15.x/docs/api/net.html#net_server_listen_port_host_backlog_callback | node.js documentation},
 * the operating system can assign an arbitrary unused port.
 * The function then closes the server and returns the port number.
 * @public
 */
export async function getFreePort({ host }: { host: string }): Promise<number> {
  const server = createServer();
  await new Promise<void>((resolve, reject) =>
    server.listen(0, host, resolve).on("error", reject)
  );
  const address = server.address() as AddressInfo;
  const port = address.port;
  await new Promise(resolve => server.close(resolve));
  return port;
}
