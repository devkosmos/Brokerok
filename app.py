from flask import Flask, request, send_from_directory
import requests
import os
from datetime import datetime

app = Flask(__name__, static_folder='public', static_url_path='')

# Конфигурация
BOT_TOKEN = os.environ.get('BOT_TOKEN', '8412708945:AAEPdeJ9jd1N_Hlo-o7A0rOZjv3t-mq6gjA')
CHAT_ID = os.environ.get('CHAT_ID', '8039700599')

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('public', path)
# Разрешаем CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/api/send', methods=['POST', 'OPTIONS'])
def send_to_telegram():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'ok': False,
                'error': 'Поле "message" обязательно'
            }), 400
        
        message = data['message'].strip()
        
        # Формируем сообщение
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        full_message = f"📋 НОВАЯ ЗАЯВКА BROKEROK\n\n"
        full_message += f"🕒 {timestamp}\n"
        full_message += f"━━━━━━━━━━━━━━━━━━━━\n\n"
        full_message += message
        
        # Отправляем в Telegram
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        payload = {
            'chat_id': CHAT_ID,
            'text': full_message,
            'parse_mode': 'HTML'
        }
        
        response = requests.post(url, json=payload, timeout=10)
        result = response.json()
        
        return jsonify({
            'ok': True,
            'telegram_response': result,
            'timestamp': timestamp
        })
        
    except Exception as e:
        return jsonify({
            'ok': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'service': 'Brokerok Telegram Bot API',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/')
def serve_frontend():
    return app.send_static_file('index.html')

# Для Vercel важно иметь app объект
if __name__ == '__main__':
    app.run(debug=True)