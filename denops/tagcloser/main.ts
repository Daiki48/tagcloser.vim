import type { Denops } from "https://deno.land/x/denops_std@v5.0.2/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v5.0.2/helper/mod.ts";
import * as fn from "https://deno.land/x/denops_std@v5.0.2/function/mod.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    "autoclose_tag": async function(): Promise<string> {
      const line = await fn.getline(denops, '.');
      const col = await fn.col(denops, '.');
      const tag = line.substring(0, col).match('<(\\w+)[^<]*$');

      if (tag) {
        await denops.cmd('normal! a</' + tag[1] + '>');
        await denops.cmd('normal! ' + String(tag[1].length + 2) + 'h');
      }
      return '>';
    }
  }
  await execute (
    denops,
    `
      inoremap >> <C-r>=denops#request('${denops.name}', 'autoclose_tag', [])<CR>
    `,
  );
}



