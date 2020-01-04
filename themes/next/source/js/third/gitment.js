(function(config){
// https://imsun.net/posts/gitment-introduction/
const _icons = {
    github: '<svg class="gitment-github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"/></svg>',
    heart: '<svg class="gitment-heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 39.7l-.6-.5C11.5 28.7 8 25 8 19c0-5 4-9 9-9 4.1 0 6.4 2.3 8 4.1 1.6-1.8 3.9-4.1 8-4.1 5 0 9 4 9 9 0 6-3.5 9.7-16.4 20.2l-.6.5zM17 12c-3.9 0-7 3.1-7 7 0 5.1 3.2 8.5 15 18.1 11.8-9.6 15-13 15-18.1 0-3.9-3.1-7-7-7-3.5 0-5.4 2.1-6.9 3.8L25 17.1l-1.1-1.3C22.4 14.1 20.5 12 17 12z"/></svg>',
    spinner: '<svg class="gitment-spinner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 18c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1z"/><path opacity=".3" d="M25 42c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1z"/><path opacity=".3" d="M29 19c-.2 0-.3 0-.5-.1-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4z"/><path opacity=".3" d="M17 39.8c-.2 0-.3 0-.5-.1-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4z"/><path opacity=".93" d="M21 19c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3.4-.3 1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3-.2.2-.3.2-.5.2z"/><path opacity=".3" d="M33 39.8c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3.4-.3 1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3-.2.1-.3.2-.5.2z"/><path opacity=".65" d="M17 26H9c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"/><path opacity=".3" d="M41 26h-8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"/><path opacity=".86" d="M18.1 21.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3-.2.3-.5.4-.8.4z"/><path opacity=".3" d="M38.9 33.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3-.2.3-.5.4-.8.4z"/><path opacity=".44" d="M11.1 33.9c-.3 0-.6-.2-.8-.5-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3.3.4.1 1-.3 1.3l-6.9 4c-.1.2-.3.2-.5.2z"/><path opacity=".3" d="M31.9 21.9c-.3 0-.6-.2-.8-.5-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3.3.4.1 1-.3 1.3l-6.9 4c-.2.2-.3.2-.5.2z"/></svg>',
}
const _constants = {
    NOT_INITIALIZED_ERROR: new Error('Comments Not Initialized')
}
const _slicedToArray = function () { 
    function sliceIterator(arr, i) { 
        var _arr = []; 
        var _n = true; 
        var _d = false; 
        var _e = undefined; 
        try { 
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { 
                _arr.push(_s.value); 
                if (i && _arr.length === i) break; 
            } 
        } catch (err) { 
            _d = true; 
            _e = err; 
        } finally { 
            try { 
                if (!_n && _i["return"]) _i["return"](); 
            } finally { 
                if (_d) throw _e; 
            } 
        } 
        return _arr; 
    } 
    return function (arr, i) { 
        if (Array.isArray(arr)) { 
            return arr; 
        } else if (Symbol.iterator in Object(arr)) { 
            return sliceIterator(arr, i); 
        } else { 
            throw new TypeError("试图对不可迭代实例进行结构破坏的尝试无效"); 
        } 
    }; 
}();
const myTheme = {
    render(state, instance) {
        const container = document.createElement('div')
        container.lang = "zh-CN"
        container.className = 'gitment-container gitment-root-container'

        // your custom component
        // container.appendChild(instance.renderSomething(state, instance))

        container.appendChild(instance.renderHeader(state, instance))
        container.appendChild(instance.renderComments(state, instance))
        container.appendChild(instance.renderEditor(state, instance))
        container.appendChild(instance.renderFooter(state, instance))
        return container
    },
    renderHeader(_ref, instance) {
        var meta = _ref.meta,
            user = _ref.user,
            reactions = _ref.reactions;
        var container = document.createElement('div');
        container.lang = "zh-CN";
        container.className = 'gitment-container gitment-header-container';
        var likeButton = document.createElement('span');
        var likedReaction = reactions.find(function (reaction) {
            return reaction.content === 'heart' && reaction.user.login === user.login;
        });
        likeButton.className = 'gitment-header-like-btn';
        likeButton.innerHTML = '\n    ' + _icons.heart + '\n    ' + (likedReaction ? '已赞' : '赞') + '\n    ' + (meta.reactions && meta.reactions.heart ? ' \u2022 <strong>' + meta.reactions.heart + '</strong> 赞' : '') + '\n  ';
        if (likedReaction) {
            likeButton.classList.add('liked');
            likeButton.onclick = function () {
            return instance.unlike();
            };
        } else {
            likeButton.classList.remove('liked');
            likeButton.onclick = function () {
                return instance.like();
            };
        }
        container.appendChild(likeButton);
        var commentsCount = document.createElement('span');
        commentsCount.innerHTML = '\n    ' + (meta.comments ? ' \u2022 <strong>' + meta.comments + '</strong> 条评论' : '') + '\n  ';
        container.appendChild(commentsCount);
        var issueLink = document.createElement('a');
        issueLink.className = 'gitment-header-issue-link';
        issueLink.href = meta.html_url;
        issueLink.target = '_blank';
        issueLink.innerText = 'Issue 页面';
        container.appendChild(issueLink);
        return container;
    },
    renderComments(_ref2, instance) {
        var meta = _ref2.meta,
            comments = _ref2.comments,
            commentReactions = _ref2.commentReactions,
            currentPage = _ref2.currentPage,
            user = _ref2.user,
            error = _ref2.error;
        var container = document.createElement('div');
        container.lang = "zh-CN";
        container.className = 'gitment-container gitment-comments-container';
        if (error) {
            var errorBlock = document.createElement('div');
            errorBlock.className = 'gitment-comments-error';
            if ((error && error.message === _constants.NOT_INITIALIZED_ERROR.message) && user.login && user.login.toLowerCase() === instance.owner.toLowerCase()) {
                var initHint = document.createElement('div');
                var initButton = document.createElement('button');
                initButton.className = 'gitment-comments-init-btn';
                initButton.onclick = function () {
                    initButton.setAttribute('disabled', true);
                    instance.init().catch(function (e) {
                        initButton.removeAttribute('disabled');
                        alert(e);
                    });
                };
                initButton.innerText = '初始化评论';
                initHint.appendChild(initButton);
                errorBlock.appendChild(initHint);
            } else {
                if(error && error.message === 'Comments Not Initialized') {
                    errorBlock.innerText = '评论未初始化';
                } else if(error && error.message === 'Bad credentials') {
                    errorBlock.innerText = '错误： 认证失败';
                } else {
                    errorBlock.innerText = error;
                }
            }
            container.appendChild(errorBlock);
            return container;
        } else if (comments === undefined) {
            var loading = document.createElement('div');
            loading.innerText = '评论加载中...';
            loading.className = 'gitment-comments-loading';
            container.appendChild(loading);
            return container;
        } else if (!comments.length) {
            var emptyBlock = document.createElement('div');
            emptyBlock.className = 'gitment-comments-empty';
            emptyBlock.innerText = '暂无评论';
            container.appendChild(emptyBlock);
            return container;
        }
        var commentsList = document.createElement('ul');
        commentsList.className = 'gitment-comments-list';
        comments.forEach(function (comment) {
            var createDate = new Date(comment.created_at);
            var updateDate = new Date(comment.updated_at);
            var commentItem = document.createElement('li');
            commentItem.className = 'gitment-comment';
            commentItem.innerHTML = '\n      <a class="gitment-comment-avatar" href="' + comment.user.html_url + '" target="_blank">\n        <img class="gitment-comment-avatar-img" src="' + comment.user.avatar_url + '"/>\n      </a>\n      <div class="gitment-comment-main" style="background-color:rgba(255,255,255,.7)">\n        <div class="gitment-comment-header" style="background-color:transparent">\n          <a class="gitment-comment-name" href="' + comment.user.html_url + '" target="_blank">\n            ' + comment.user.login + '\n          </a>\n          评论于\n          <span title="' + createDate + '">' + createDate.toLocaleString() + '</span>\n          ' + (createDate.toString() !== updateDate.toString() ? ' \u2022 <span title="评论编辑于 ' + updateDate.toLocaleString() + '">edited</span>' : '') + '\n          <div class="gitment-comment-like-btn">' + _icons.heart + ' ' + (comment.reactions.heart || '') + '</div>\n        </div>\n        <div class="gitment-comment-body gitment-markdown">' + comment.body_html + '</div>\n      </div>\n    ';
            var likeButton = commentItem.querySelector('.gitment-comment-like-btn');
            var likedReaction = commentReactions[comment.id] && commentReactions[comment.id].find(function (reaction) {
                return reaction.content === 'heart' && reaction.user.login === user.login;
            });
            if (likedReaction) {
                likeButton.classList.add('liked');
                likeButton.onclick = function () {
                    return instance.unlikeAComment(comment.id);
                };
            } else {
                likeButton.classList.remove('liked');
                likeButton.onclick = function () {
                    return instance.likeAComment(comment.id);
                };
            }
            // dirty
            // use a blank image to trigger height calculating when element rendered
            var imgTrigger = document.createElement('img');
            var markdownBody = commentItem.querySelector('.gitment-comment-body');
            imgTrigger.className = 'gitment-hidden';
            imgTrigger.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            imgTrigger.onload = function () {
                if (markdownBody.clientHeight > instance.maxCommentHeight) {
                    markdownBody.classList.add('gitment-comment-body-folded');
                    markdownBody.style.maxHeight = instance.maxCommentHeight + 'px';
                    markdownBody.title = '点击展开';
                    markdownBody.onclick = function () {
                        markdownBody.classList.remove('gitment-comment-body-folded');
                        markdownBody.style.maxHeight = '';
                        markdownBody.title = '';
                        markdownBody.onclick = null;
                    };
                }
            };
            commentItem.appendChild(imgTrigger);
            commentsList.appendChild(commentItem);
        });
        container.appendChild(commentsList);
        if (meta) {
            var pageCount = Math.ceil(meta.comments / instance.perPage);
            if (pageCount > 1) {
                var pagination = document.createElement('ul');
                pagination.className = 'gitment-comments-pagination';
                if (currentPage > 1) {
                    var previousButton = document.createElement('li');
                    previousButton.className = 'gitment-comments-page-item';
                    previousButton.innerText = '上一页';
                    previousButton.onclick = function () {
                        return instance.goto(currentPage - 1);
                    };
                    pagination.appendChild(previousButton);
                }
                var _loop = function _loop(i) {
                    var pageItem = document.createElement('li');
                    pageItem.className = 'gitment-comments-page-item';
                    pageItem.innerText = i;
                    pageItem.onclick = function () {
                        return instance.goto(i);
                    };
                    if (currentPage === i) pageItem.classList.add('gitment-selected');
                    pagination.appendChild(pageItem);
                };
                for (var i = 1; i <= pageCount; i++) {
                    _loop(i);
                }
                if (currentPage < pageCount) {
                    var nextButton = document.createElement('li');
                    nextButton.className = 'gitment-comments-page-item';
                    nextButton.innerText = '下一页';
                    nextButton.onclick = function () {
                        return instance.goto(currentPage + 1);
                    };
                    pagination.appendChild(nextButton);
                }
                container.appendChild(pagination);
            }
        }
        return container;
    },
    renderEditor(_ref3, instance) {
        var user = _ref3.user, error = _ref3.error;
        var container = document.createElement('div');
        container.lang = "zh-CN";
        container.className = 'gitment-container gitment-editor-container';
        var shouldDisable = user.login && !error ? '' : 'disabled';
        var disabledTip = user.login ? '' : '登录评论';
        container.innerHTML = '\n      ' + (user.login ? '<a class="gitment-editor-avatar" href="' + user.html_url + '" target="_blank">\n            <img class="gitment-editor-avatar-img" src="' + user.avatar_url + '"/>\n          </a>' : user.isLoggingIn ? '<div class="gitment-editor-avatar">' + _icons.spinner + '</div>' : '<a class="gitment-editor-avatar" href="' + instance.loginLink + '" title="使用GitHub登录">\n              ' + _icons.github + '\n            </a>') + '\n    </a>\n    <div class="gitment-editor-main">\n      <div class="gitment-editor-header">\n        <nav class="gitment-editor-tabs">\n          <button class="gitment-editor-tab gitment-selected" style="background-color:rgba(255,255,255,.7)">编辑</button>\n          <button class="gitment-editor-tab">预览</button>\n        </nav>\n        <div class="gitment-editor-login">\n          ' + (user.login ? '<a class="gitment-editor-logout-link">退出</a>' : user.isLoggingIn ? '登录中...' : '<a class="gitment-editor-login-link" href="' + instance.loginLink + '">登录</a> GitHub账号') + '\n        </div>\n      </div>\n      <div class="gitment-editor-body">\n        <div class="gitment-editor-write-field">\n          <textarea placeholder="发表评论" style="background-color:rgba(255,255,255,.7)" title="' + disabledTip + '" ' + shouldDisable + '></textarea>\n        </div>\n        <div class="gitment-editor-preview-field gitment-hidden">\n          <div class="gitment-editor-preview gitment-markdown"></div>\n        </div>\n      </div>\n    </div>\n    <div class="gitment-editor-footer">\n      <a class="gitment-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">\n        支持 Markdown 标记\n      </a>\n      <button class="gitment-editor-submit" title="' + disabledTip + '" ' + shouldDisable + '>评论</button>\n    </div>\n  ';
        if (user.login) {
            container.querySelector('.gitment-editor-logout-link').onclick = function () {
                return instance.logout();
            };
        }
        var writeField = container.querySelector('.gitment-editor-write-field');
        var previewField = container.querySelector('.gitment-editor-preview-field');
        var textarea = writeField.querySelector('textarea');
        textarea.oninput = function () {
            textarea.style.height = 'auto';
            var style = window.getComputedStyle(textarea, null);
            var height = parseInt(style.height, 10);
            var clientHeight = textarea.clientHeight;
            var scrollHeight = textarea.scrollHeight;
            if (clientHeight < scrollHeight) {
                textarea.style.height = height + scrollHeight - clientHeight + 'px';
            }
        };
        var _container$querySelec = container.querySelectorAll('.gitment-editor-tab'),
            _container$querySelec2 = _slicedToArray(_container$querySelec, 2),
            writeTab = _container$querySelec2[0],
            previewTab = _container$querySelec2[1];
        writeTab.onclick = function () {
            writeTab.classList.add('gitment-selected');
            previewTab.classList.remove('gitment-selected');
            writeField.classList.remove('gitment-hidden');
            previewField.classList.add('gitment-hidden');
            textarea.focus();
        };
        previewTab.onclick = function () {
            previewTab.classList.add('gitment-selected');
            writeTab.classList.remove('gitment-selected');
            previewField.classList.remove('gitment-hidden');
            writeField.classList.add('gitment-hidden');
            var preview = previewField.querySelector('.gitment-editor-preview');
            var content = textarea.value.trim();
            if (!content) {
                preview.innerText = '无预览内容';
                return;
            }
            preview.innerText = '预览加载中...';
            instance.markdown(content).then(function (html) {
                return preview.innerHTML = html;
            });
        };
        var submitButton = container.querySelector('.gitment-editor-submit');
        submitButton.onclick = function () {
            submitButton.innerText = '提交中...';
            submitButton.setAttribute('disabled', true);
            instance.post(textarea.value.trim()).then(function (data) {
                textarea.value = '';
                textarea.style.height = 'auto';
                submitButton.removeAttribute('disabled');
                submitButton.innerText = '评论';
            }).catch(function (e) {
                alert(e);
                submitButton.removeAttribute('disabled');
                submitButton.innerText = '评论';
            });
        };
        return container;
    },
    renderFooter() {
        var container = document.createElement('div');
        container.lang = "zh-CN";
        container.className = 'gitment-container gitment-footer-container';
        container.innerHTML = '\n    由\n    <a class="gitment-footer-project-link" href="https://github.com/imsun/gitment" target="_blank">\n      Gitment\n    </a>提供\n  ';
        return container;
    },
    renderSomething(state, instance) {
        const container = document.createElement('div')
        container.lang = "zh-CN"
        if (state.user.login) {
            container.innerText = `Hello, ${state.user.login}`
        }
        return container
    }
}
var metas = document.head.getElementsByTagName('meta') || [];
var gitmentId = location.href;
for(var index=0; index<metas.length; index++){
    if(metas[index].attributes && metas[index].attributes[0].value==='og:title'){
        gitmentId = metas[index].content;
    }
}
var gitment = new Gitment({
    // id: '{{ page.path }}', // 可选。默认为 location.href
    // id: '{{ page.title }}',
    id: gitmentId,
    owner: 'jinven',
    repo: 'jinven.github.io',
    // repo: config.hostname,
    oauth: {
        client_id: 'b086cb47e7458ee5c7ba',
        client_secret: '62c492e68fad5ccd2db61e0badf7326e9641a53f',
    },
    theme: myTheme,
})
if (document.getElementById('gitmentContainer')) {
    gitment.render('gitmentContainer')
}
}());
