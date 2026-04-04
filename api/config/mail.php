<?php
return [
    'smtp_host'     => 'smtp.websupport.cz',    // SMTP_HOST
    'smtp_port'     => 587,   // SMTP_PORT
    'smtp_user'     => getenv('SMTP_USER') ?: '',
    'smtp_password' => getenv('SMTP_PASSWORD') ?: '',
    'smtp_secure'   => 'tls', // SMTP_SECURE
    'from_domain'   => 'lbclinic.cz',    // FROM_EMAIL
    'from_email'    => 'web@lbclinic.cz',    // FROM_EMAIL
    'from_name'     => 'LB clinic Web',    // FROM_NAME
    'to_email'      => getenv('CONTACTFORM_RECIPIENT') ?: '',
];