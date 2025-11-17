// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取登录表单
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // 添加表单提交事件监听器
    loginForm.addEventListener('submit', function(event) {
        // 阻止表单默认提交行为
        event.preventDefault();
        
        // 获取输入值
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // 简单的表单验证
        if (username === '') {
            showNotification('请输入用户名', 'error');
            usernameInput.focus();
            return;
        }
        
        if (password === '') {
            showNotification('请输入密码', 'error');
            passwordInput.focus();
            return;
        }
        
        // 这里是模拟登录过程，实际项目中应该发送到服务器验证
        simulateLogin(username, password);
    });
    
    // 添加输入框焦点效果
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input');
        
        input.addEventListener('focus', function() {
            group.style.boxShadow = '0 5px 15px rgba(255, 184, 77, 0.2)';
            group.style.borderColor = '#ffb84d';
        });
        
        input.addEventListener('blur', function() {
            group.style.boxShadow = 'none';
            group.style.borderColor = 'rgba(255, 184, 77, 0.3)';
        });
    });
    
    // 忘记密码链接点击事件
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        showNotification('忘记密码功能暂未开放', 'info');
    });
    
    // 注册链接点击事件
    const registerLink = document.querySelector('.login-footer a');
    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        showNotification('注册功能暂未开放', 'info');
    });
    
    // 模拟登录函数
    function simulateLogin(username, password) {
        // 显示加载状态
        showLoading(true);
        
        // 减少模拟网络请求延迟，提高响应速度
        setTimeout(function() {
            // 这里是模拟验证逻辑，使用预览版指定的用户名和密码
            if (username === 'yhu' && password === '727') {
                // 登录成功
                showNotification('登录成功！欢迎回来~', 'success');
                
                // 登录成功后，立即跳转到新页面（取消动画）
                setTimeout(function() {
                    // 直接跳转，不再添加旋转过渡动画
                    window.location.href = 'dashboard.html';
                }, 300);
            } else {
                // 登录失败
                showNotification('用户名或密码错误，请使用预览版指定的账号：用户名：yhu 密码：727', 'error');
            }
            
            // 隐藏加载状态
            showLoading(false);
        }, 500);
    }
    
    // 保存原始按钮文本
    const loginButton = loginForm.querySelector('button[type="submit"]');
    const originalButtonText = loginButton.innerHTML;
    
    // 显示加载状态函数
    function showLoading(isLoading) {
        if (isLoading) {
            loginButton.disabled = true;
            loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
        } else {
            loginButton.disabled = false;
            loginButton.innerHTML = originalButtonText;
        }
    }
    
    // 显示通知函数
    function showNotification(message, type) {
        // 检查是否已存在通知元素，如果有则移除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 创建通知元素
        const notification = document.createElement('div');
        notification.classList.add('notification');
        
        // 根据类型设置不同的样式
        if (type === 'error') {
            notification.classList.add('notification-error');
            notification.innerHTML = `<i class="fas fa-times-circle"></i> ${message}`;
        } else if (type === 'success') {
            notification.classList.add('notification-success');
            notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        } else if (type === 'info') {
            notification.classList.add('notification-info');
            notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
        }
        
        // 添加到body
        document.body.appendChild(notification);
        
        // 添加通知样式
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 30px;
                color: white;
                font-size: 14px;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideInRight 0.3s ease-out;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #2ed573 0%, #55efc4 100%);
            }
            
            .notification-info {
                background: linear-gradient(135deg, #747d8c 0%, #a4b0be 100%);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 3秒后自动消失
        setTimeout(function() {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(function() {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }
    
    // 添加一些额外的交互效果
    addExtraEffects();
});

// 添加额外的页面交互效果
function addExtraEffects() {
    // 为登录按钮添加悬停效果
    const loginButton = document.querySelector('.login-button');
    loginButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.03)';
        this.style.boxShadow = '0 10px 20px rgba(255, 184, 77, 0.3)';
    });
    
    loginButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 20px rgba(255, 184, 77, 0.3)';
    });
    
    // 为登录容器添加轻微的呼吸效果
    const loginContainer = document.querySelector('.login-container');
    setInterval(function() {
        loginContainer.style.boxShadow = '0 10px 30px rgba(255, 184, 77, 0.2)';
        setTimeout(function() {
            loginContainer.style.boxShadow = '0 10px 30px rgba(255, 184, 77, 0.3)';
        }, 1500);
    }, 3000);
    
    // 随机添加一些额外的爱心动画
    setInterval(function() {
        createRandomHeart();
    }, 2000);
}

// 创建随机爱心函数
function createRandomHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart', 'random-heart');
    
    // 随机位置
    const leftPos = Math.random() * 100;
    heart.style.left = `${leftPos}%`;
    heart.style.top = '-20px';
    
    // 随机大小
    const size = Math.random() * 15 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    // 设置伪元素的大小
    const style = document.createElement('style');
    const randomId = 'heart-' + Math.floor(Math.random() * 10000);
    heart.id = randomId;
    style.textContent = `
        #${randomId}:before,
        #${randomId}:after {
            width: ${size}px;
            height: ${size}px;
        }
        
        #${randomId}:before {
            top: -${size/2}px;
        }
        
        #${randomId}:after {
            left: -${size/2}px;
        }
        
        .random-heart {
            animation: fall ${Math.random() * 3 + 3}s linear forwards;
            opacity: 0.8;
        }
        
        @keyframes fall {
            0% {
                transform: rotate(45deg) translateY(-20px);
                opacity: 0.8;
            }
            100% {
                transform: rotate(45deg) translateY(100vh);
                opacity: 0;
            }
        }
    `;
    
    document.body.appendChild(style);
    document.body.appendChild(heart);
    
    // 动画结束后移除元素
    setTimeout(function() {
        heart.remove();
        style.remove();
    }, 6000);
}