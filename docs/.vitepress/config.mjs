import { defineConfig } from 'vitepress';
import { readFileSync } from 'node:fs';
const pages = JSON.parse(readFileSync(new URL('../navigation.json', import.meta.url), 'utf8'));
const groups = [...new Set(pages.map(p => p.group))];
const labels = new Map([['CHỐT','confirmed'],['ĐỀ MÔN','course'],['KẾ HOẠCH','planned'],['ĐỀ XUẤT','proposed'],['MỞ','open']]);
export default defineConfig({
  lang: 'vi-VN', title: 'Restaurant OS', description: 'Cổng tài liệu chung cho SE, HTTTDN và Big Data',
  srcDir: 'content', cleanUrls: true, lastUpdated: true,
  themeConfig: {
    siteTitle: 'Restaurant OS',
    nav: [
      { text: 'Bắt đầu', link: '/start/read-first' },
      { text: 'Tính năng', link: '/features/' },
      { text: 'Quyết định', link: '/decisions/open' },
      { text: 'Viết tài liệu', link: '/contributing/writing' }
    ],
    sidebar: groups.map(group => ({ text: group, collapsed: group !== 'Bắt đầu ở đây', items: pages.filter(p => p.group === group).map(p => ({text:p.title,link:'/'+p.path.replace(/\.md$/,'')})) })),
    search: { provider: 'local', options: { locales: { root: { translations: { button: { buttonText: 'Tìm kiếm', buttonAriaLabel: 'Tìm tài liệu' }, modal: { noResultsText: 'Không tìm thấy', resetButtonTitle: 'Xóa tìm kiếm', footer: { selectText: 'chọn', navigateText: 'di chuyển', closeText: 'đóng' } } } } } } },
    outline: { level: [2,3], label: 'Trong trang này' },
    docFooter: { prev: 'Trang trước', next: 'Đọc tiếp' },
    lastUpdated: { text: 'Cập nhật từ Git' },
    sidebarMenuLabel: 'Mục lục', returnToTopLabel: 'Lên đầu trang', darkModeSwitchLabel: 'Giao diện tối',
    footer: { message: 'Một nguồn nội dung · Một nhóm · Ba đồ án', copyright: 'Đặc tả đã chốt không đồng nghĩa code đã hoàn thành.' }
  },
  markdown: { config(md) {
    const original=md.renderer.rules.text || ((tokens,i)=>md.utils.escapeHtml(tokens[i].content));
    md.renderer.rules.text=(tokens,i,options,env,self)=>original(tokens,i,options,env,self).replace(/\[(CHỐT|ĐỀ MÔN|KẾ HOẠCH|ĐỀ XUẤT|MỞ)\]/g,(_,label)=>`<span class="doc-badge ${labels.get(label)}">${label}</span>`);
  } }
});
