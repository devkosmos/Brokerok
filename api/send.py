from http.server import BaseHTTPRequestHandler
import json
import requests
from datetime import datetime
import os

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        try:
            # Читаем данные
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Проверяем сообщение
            if 'message' not in data:
                self.send_error_response('Поле "message" обязательно')
                return
            
            message = data['message'].strip()
            
            # Получаем настройки из переменных окружения Vercel
            BOT_TOKEN = os.environ.get('BOT_TOKEN', '8412708945:AAEPdeJ9jd1N_Hlo-o7A0rOZjv3t-mq6gjA')
            CHAT_ID = os.environ.get('CHAT_ID', '8039700599')
            
            # Формируем сообщение для Telegram
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            full_message = f"📋 НОВАЯ ЗАЯВКА BROKEROK\n\n"
            full_message += f"🕒 {timestamp}\n"
            full_message += f"━━━━━━━━━━━━━━━━━━━━\n\n"
            full_message += message
            full_message += f"\n\n━━━━━━━━━━━━━━━━━━━━\n"
            full_message += f"✅ Заявка #{int(datetime.now().timestamp())}"
            
            # Отправляем в Telegram
            url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            payload = {
                'chat_id': CHAT_ID,
                'text': full_message,
                'parse_mode': 'HTML',
                'disable_web_page_preview': True
            }
            
            response = requests.post(url, json=payload, timeout=10)
            result = response.json()
            
            # Отправляем ответ
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            self.wfile.write(json.dumps({
                'ok': True,
                'telegram_response': result,
                'timestamp': timestamp,
                'message_sent': len(message)
            }).encode('utf-8'))
            
        except Exception as e:
            self.send_error_response(f'Ошибка: {str(e)}')
    
    def send_error_response(self, message):
        self.send_response(400)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        self.wfile.write(json.dumps({
            'ok': False,
            'error': message
        }).encode('utf-8'))