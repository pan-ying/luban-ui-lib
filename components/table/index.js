(function () {
    /**
     * 定义Table的类
     * constructor 构造器
     * */
    class Table {
        /**
         * Table所用到的DOM模板
         * */
        domTemplate = {
            table: '<table class="luban-ui-table">${table}</table>',
            header: {
                wrap: '<thead>${thead}</thead>',
                cell: '<th>${headCell}</th>'
            },
            body: {
                wrap: '<tbody>${tbody}</tbody>',
                tr: '<tr>${bodyTr}</tr>',
                cell: '<td>${bodyCell}</td>'
            }
        }

        constructor (options) {
            this.options = options
            // 传入的配置项的合法性检查
            const isValid = this.checkValid()
            if (isValid) {
                // table渲染
                this.renderTable()
            }
        }

        /**
         * 校验合法性
         * @return {boolean} valid
         * */
        checkValid () {
            if (!this.options?.el) {
                console.error('[el] 挂载节点不存在')
                return false;
            }
            if (!this.options?.columns) {
                console.error('[columns] 表头项不存在')
                return false;
            }
            if (!this.options?.dataSource) {
                console.error('[dataSource] 内容配置项不存在')
                return false;
            }
            return true;
        }

        /**
         * Table渲染过程
         * */
        renderTable () {
            // 获取挂载节点的DOM模型对象
            const el = document.querySelector(this.options?.el)
            // 表头的HTML字符串模板
            const headerHtml = this.renderTableHead()
            // 列表的HTML字符串模板
            const bodyHtml = this.renderTableBody()
            // 插入到挂载节点
            el.innerHTML = this.domTemplate.table.replace('${table}', headerHtml + bodyHtml)
        }

        /**
         * Table 表头渲染过程
         * @return {$ElementType} head html
         * */
        renderTableHead () {
            let html = ''
            const {columns} = this.options
            if (columns?.length) {
                // 循环dom,拼接字符串
                columns.forEach((item) => {
                    html += this.domTemplate.header.cell.replace('${headCell}', item.title)
                })
            }
            return html
        }

        /**
         * Table 数据列表渲染过程
         * @return {$ElementType} body html
         * */
        renderTableBody () {
            let html = ''
            const {dataSource, columns} = this.options
            if (dataSource.length) {
                // 循环dom,拼接字符串
                dataSource.forEach((data) => {
                    let tdStr = ''
                    columns.forEach((col) => {
                        if (data[col.dataIndex]) {
                            tdStr += this.domTemplate.body.cell.replace('${bodyCell}', data[col.dataIndex])
                        }
                    })
                    html += this.domTemplate.body.tr.replace('${bodyTr}', tdStr)
                })
            } else {
                const tdStr = this.domTemplate.body.cell.replace('${bodyCell}', '暂无数据')
                html = this.domTemplate.body.tr.replace('${bodyTr}', tdStr)
            }
            return html
        }
    }

    if (!window.lubanUI) {
        window.lubanUI = {}
    }
    window.lubanUI = {
        ...window.lubanUI,
        Table
    }
})(window)