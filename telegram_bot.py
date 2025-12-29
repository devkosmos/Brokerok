#!/usr/bin/env python3
"""
Простой Telegram бот для сайта
Запуск: python simple_bot.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Разрешаем CORS

# Настройки
BOT_TOKEN = "8412708945:AAEPdeJ9jd1N_Hlo-o7A0rOZjv3t-mq6gjA"
CHAT_ID = "8039700599"

@app.route('/send', methods=['POST', 'OPTIONS'])
def send_to_telegram():
    """Основной endpoint для отправки заявок"""
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'ok': False,
                'description': 'Поле "message" обязательно'
            }), 400
        
        message = data['message']
        
        # Формируем сообщение
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        full_message = f"📋 НОВАЯ ЗАЯВКА\n\n"
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
        
        # Сохраняем локально
        with open('applications.log', 'a', encoding='utf-8') as f:
            log_entry = {
                'timestamp': timestamp,
                'message': message[:100] + '...' if len(message) > 100 else message,
                'telegram_result': result
            }
            f.write(json.dumps(log_entry, ensure_ascii=False) + '\n')
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            'ok': False,
            'description': f'Ошибка: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Проверка работоспособности"""
    return jsonify({
        'status': 'ok',
        'service': 'Telegram Bot API',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Запуск Telegram бота...")
    print("📝 Endpoint: http://localhost:5000/send")
    print("🔍 Проверка: http://localhost:5000/health")
    app.run(host='0.0.0.0', port=5000, debug=True)