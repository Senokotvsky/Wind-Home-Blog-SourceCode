#!/bin/bash

# 获取所有非Asano提交者的邮箱
NON_ASANO_EMAILS=$(git log --all --format="%ae" | grep -v "magmalatte@outlook.com" | grep -v "142891515+Senokotvsky@users.noreply.github.com" | sort -u)

echo "非Asano提交者邮箱列表:"
echo "$NON_ASANO_EMAILS"
echo ""

# 创建filter-branch命令
FILTER_CMD="git filter-branch --commit-filter '
    if [ \"\$GIT_AUTHOR_EMAIL\" = \"magmalatte@outlook.com\" ] || [ \"\$GIT_AUTHOR_EMAIL\" = \"142891515+Senokotvsky@users.noreply.github.com\" ]; then
        git commit-tree \"\$@\";
    else
        # 修改为非Asano提交者，改为Asano
        GIT_AUTHOR_NAME=\"Asano\"
        GIT_AUTHOR_EMAIL=\"magmalatte@outlook.com\"
        GIT_COMMITTER_NAME=\"Asano\"
        GIT_COMMITTER_EMAIL=\"magmalatte@outlook.com\"
        git commit-tree \"\$@\";
    fi' --tag-name-filter cat -- --all"

echo "将执行以下命令:"
echo "$FILTER_CMD"
