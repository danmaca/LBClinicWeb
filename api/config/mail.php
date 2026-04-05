<?php
return [
    'smtp_host' => 'smtp.websupport.cz',
    'smtp_port' => 587,
    'smtp_user' => getenv('SMTP_USER') ?: '',
    'smtp_password' => getenv('SMTP_PASSWORD') ?: '',
    'smtp_secure' => 'tls',
    'from_domain' => 'lbclinic.cz',
    'from_email' => 'web@lbclinic.cz',
    'from_name' => 'LB clinic Web',
    'to_email' => getenv('CONTACTFORM_RECIPIENT') ?: '',
];