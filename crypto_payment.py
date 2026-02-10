"""
Cryptocurrency payment module for Brokerok
Supports: Bitcoin, Ethereum, USDT, USDC
"""

import hashlib
import hmac
import json
from datetime import datetime, timedelta
import uuid

class CryptoPayment:
    """Handle cryptocurrency payments"""
    
    # Supported cryptocurrencies
    SUPPORTED_CRYPTOS = {
        'BTC': {
            'name': 'Bitcoin',
            'symbol': 'BTC',
            'decimals': 8,
            'network': 'Bitcoin',
            'min_amount': 0.001
        },
        'ETH': {
            'name': 'Ethereum',
            'symbol': 'ETH',
            'decimals': 18,
            'network': 'Ethereum',
            'min_amount': 0.01
        },
        'USDT': {
            'name': 'Tether',
            'symbol': 'USDT',
            'decimals': 6,
            'network': 'Ethereum',
            'min_amount': 10
        },
        'USDC': {
            'name': 'USD Coin',
            'symbol': 'USDC',
            'decimals': 6,
            'network': 'Ethereum',
            'min_amount': 10
        },
        'BNB': {
            'name': 'Binance Coin',
            'symbol': 'BNB',
            'decimals': 18,
            'network': 'BSC',
            'min_amount': 0.01
        }
    }
    
    # Merchant wallet addresses (in production, use secure configuration)
    MERCHANT_WALLETS = {
        'BTC': '1A1z7agoat2YLZW51Bc7M8uc2pm3zEsw6j',
        'ETH': '0x742d35Cc6634C0532925a3b844Bc9e7595f42bE',
        'USDT': '0x742d35Cc6634C0532925a3b844Bc9e7595f42bE',
        'USDC': '0x742d35Cc6634C0532925a3b844Bc9e7595f42bE',
        'BNB': '0x742d35Cc6634C0532925a3b844Bc9e7595f42bE',
    }
    
    # Exchange rates (in production, fetch from API)
    EXCHANGE_RATES = {
        'BTC': 45000,  # USD per BTC
        'ETH': 2500,   # USD per ETH
        'USDT': 1,     # USD per USDT
        'USDC': 1,     # USD per USDC
        'BNB': 600,    # USD per BNB
    }
    
    @staticmethod
    def get_supported_cryptos():
        """Get list of supported cryptocurrencies"""
        return CryptoPayment.SUPPORTED_CRYPTOS
    
    @staticmethod
    def get_merchant_address(crypto_type):
        """Get merchant wallet address for crypto type"""
        return CryptoPayment.MERCHANT_WALLETS.get(crypto_type)
    
    @staticmethod
    def convert_usd_to_crypto(usd_amount, crypto_type):
        """Convert USD amount to cryptocurrency amount"""
        if crypto_type not in CryptoPayment.EXCHANGE_RATES:
            raise ValueError(f"Unsupported cryptocurrency: {crypto_type}")
        
        rate = CryptoPayment.EXCHANGE_RATES[crypto_type]
        crypto_amount = usd_amount / rate
        
        # Round to appropriate decimals
        decimals = CryptoPayment.SUPPORTED_CRYPTOS[crypto_type]['decimals']
        crypto_amount = round(crypto_amount, decimals)
        
        return crypto_amount
    
    @staticmethod
    def convert_crypto_to_usd(crypto_amount, crypto_type):
        """Convert cryptocurrency amount to USD"""
        if crypto_type not in CryptoPayment.EXCHANGE_RATES:
            raise ValueError(f"Unsupported cryptocurrency: {crypto_type}")
        
        rate = CryptoPayment.EXCHANGE_RATES[crypto_type]
        usd_amount = crypto_amount * rate
        
        return round(usd_amount, 2)
    
    @staticmethod
    def validate_wallet_address(address, crypto_type):
        """Validate wallet address format"""
        if crypto_type == 'BTC':
            # Bitcoin address validation (simplified)
            return len(address) in [26, 34, 42] and address[0] in ['1', '3', 'b']
        elif crypto_type in ['ETH', 'USDT', 'USDC', 'BNB']:
            # Ethereum-based address validation
            return len(address) == 42 and address.startswith('0x')
        return False
    
    @staticmethod
    def generate_payment_request(property_id, user_id, amount_usd, crypto_type):
        """Generate a payment request"""
        if crypto_type not in CryptoPayment.SUPPORTED_CRYPTOS:
            raise ValueError(f"Unsupported cryptocurrency: {crypto_type}")
        
        crypto_amount = CryptoPayment.convert_usd_to_crypto(amount_usd, crypto_type)
        merchant_address = CryptoPayment.get_merchant_address(crypto_type)
        
        payment_request = {
            'id': str(uuid.uuid4()),
            'property_id': property_id,
            'user_id': user_id,
            'amount_usd': amount_usd,
            'crypto_type': crypto_type,
            'crypto_amount': crypto_amount,
            'merchant_address': merchant_address,
            'created_at': datetime.utcnow().isoformat(),
            'expires_at': (datetime.utcnow() + timedelta(hours=1)).isoformat(),
            'status': 'pending',
            'confirmations_required': 1 if crypto_type == 'BTC' else 12,
            'confirmations_received': 0
        }
        
        return payment_request
    
    @staticmethod
    def generate_payment_qr_data(merchant_address, crypto_amount, crypto_type):
        """Generate QR code data for payment"""
        if crypto_type == 'BTC':
            return f"bitcoin:{merchant_address}?amount={crypto_amount}"
        elif crypto_type == 'ETH':
            return f"ethereum:{merchant_address}?value={int(crypto_amount * 1e18)}"
        elif crypto_type in ['USDT', 'USDC', 'BNB']:
            return f"ethereum:{merchant_address}?value={int(crypto_amount * 1e6)}"
        return None
    
    @staticmethod
    def verify_transaction(tx_hash, merchant_address, crypto_type, expected_amount):
        """
        Verify a transaction on blockchain
        In production, integrate with blockchain APIs (etherscan, blockcypher, etc.)
        """
        # This is a mock verification
        # In production, you would query the blockchain API
        return {
            'tx_hash': tx_hash,
            'status': 'confirmed',
            'confirmations': 12,
            'from_address': '0x1234567890123456789012345678901234567890',
            'to_address': merchant_address,
            'amount': expected_amount,
            'crypto_type': crypto_type,
            'timestamp': datetime.utcnow().isoformat(),
            'verified': True
        }
    
    @staticmethod
    def get_payment_status(tx_hash, crypto_type):
        """Get payment status from blockchain"""
        # Mock implementation
        return {
            'tx_hash': tx_hash,
            'status': 'confirmed',
            'confirmations': 12,
            'timestamp': datetime.utcnow().isoformat()
        }


class PaymentProcessor:
    """Process cryptocurrency payments"""
    
    def __init__(self, db):
        self.db = db
    
    def create_payment_request(self, property_id, user_id, amount_usd, crypto_type):
        """Create a new payment request"""
        from models import Transaction
        
        if crypto_type not in CryptoPayment.SUPPORTED_CRYPTOS:
            raise ValueError(f"Unsupported cryptocurrency: {crypto_type}")
        
        crypto_amount = CryptoPayment.convert_usd_to_crypto(amount_usd, crypto_type)
        merchant_address = CryptoPayment.get_merchant_address(crypto_type)
        
        transaction = Transaction(
            user_id=user_id,
            property_id=property_id,
            amount=amount_usd,
            currency='USD',
            crypto_type=crypto_type,
            wallet_address=merchant_address,
            status='pending'
        )
        
        self.db.session.add(transaction)
        self.db.session.commit()
        
        return {
            'transaction_id': transaction.id,
            'merchant_address': merchant_address,
            'crypto_amount': crypto_amount,
            'crypto_type': crypto_type,
            'amount_usd': amount_usd,
            'expires_at': (datetime.utcnow() + timedelta(hours=1)).isoformat()
        }
    
    def confirm_payment(self, transaction_id, tx_hash):
        """Confirm a payment transaction"""
        from models import Transaction
        
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            raise ValueError("Transaction not found")
        
        transaction.transaction_hash = tx_hash
        transaction.status = 'completed'
        transaction.updated_at = datetime.utcnow()
        
        self.db.session.commit()
        
        return {
            'transaction_id': transaction.id,
            'status': 'completed',
            'tx_hash': tx_hash
        }
    
    def get_payment_info(self, transaction_id):
        """Get payment information"""
        from models import Transaction
        
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            raise ValueError("Transaction not found")
        
        crypto_amount = CryptoPayment.convert_usd_to_crypto(
            transaction.amount,
            transaction.crypto_type
        )
        
        return {
            'transaction_id': transaction.id,
            'amount_usd': transaction.amount,
            'crypto_type': transaction.crypto_type,
            'crypto_amount': crypto_amount,
            'merchant_address': transaction.wallet_address,
            'status': transaction.status,
            'created_at': transaction.created_at.isoformat()
        }
