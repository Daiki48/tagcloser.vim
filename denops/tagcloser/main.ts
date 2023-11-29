import { Denops, helper, fn } from './deps.ts';

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
  await helper.execute (
    denops,
    `
      inoremap >> <C-r>=denops#request('${denops.name}', 'autoclose_tag', [])<CR>
    `,
  );
}



